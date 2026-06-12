import pandas as pd
from sqlalchemy import create_engine, text

CSV_PATH = r"C:\Users\Ginkgo\Desktop\ginkgo_tshirt\product.csv"
MYSQL_URI = "mysql+pymysql://root:triet123@localhost:3306/ginkgo_tshirt"

engine = create_engine(MYSQL_URI)

# Create products table if not exists
with engine.connect() as conn:
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS products (
            id          INT AUTO_INCREMENT PRIMARY KEY,
            upc         VARCHAR(64),
            product_group VARCHAR(255),
            product_name  VARCHAR(255),
            sku         VARCHAR(255),
            fabric      VARCHAR(64),
            gender      VARCHAR(16),
            category    VARCHAR(64),
            style       VARCHAR(64),
            design      VARCHAR(64),
            color       VARCHAR(64),
            size        VARCHAR(64),
            price       VARCHAR(64),
            type_name_detail_en VARCHAR(255),
            type_name_group     VARCHAR(255),
            active      TINYINT DEFAULT 1
        )
    """))
    conn.commit()
    print("Ensured products table exists.")

df = pd.read_csv(CSV_PATH, dtype=str)

df.rename(columns={
    "UPC": "upc",
    "PRODUCT_GROUP": "product_group",
    "PRODUCT_NAME": "product_name",
    "SKU": "sku",
    "Fabric": "fabric",
    "Gender": "gender",
    "Category": "category",
    "Style": "style",
    "Design": "design",
    "Color": "color",
    "Size": "size",
    "TYPE_NAME_DETAIL_EN": "type_name_detail_en",
    "TYPE_NAME_GROUP": "type_name_group",
    "Price": "price",
}, inplace=True)

expected = ["upc", "product_group", "product_name", "sku",
            "fabric", "gender", "category", "style", "design",
            "color", "size", "type_name_detail_en", "type_name_group", "price"]
df = df[[c for c in expected if c in df.columns]]

print(f"Rows to import: {len(df)}")
print(f"Columns: {list(df.columns)}")
print(f"Sample: {df.head(3).to_dict('records')}")

# Truncate existing products
with engine.connect() as conn:
    conn.execute(text("TRUNCATE TABLE products"))
    conn.commit()
    print("Truncated existing products table.")

# Insert into MySQL
df.to_sql("products", con=engine, if_exists="append", index=False, method="multi", chunksize=500)
print("Import complete!")

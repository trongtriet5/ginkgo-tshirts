import pandas as pd
import pymysql
from sqlalchemy import create_engine

EXCEL_PATH = r"C:\Users\Ginkgo\Desktop\ginkgo_tshirt\Data website ginkgo.xlsx"
MYSQL_URI = "mysql+pymysql://root:triet123@localhost:3306/ginkgo_tshirt"

engine = create_engine(MYSQL_URI)

# Read Inventory sheet
df = pd.read_excel(EXCEL_PATH, sheet_name="Inventory", dtype=str)

# Rename columns to match DB schema
df.rename(columns={
    "PRODUCT_NAME": "product_name",
    "PRODUCT_GROUP": "product_group",
    "BUSINESS_TYPE": "business_type",
    "TYPE_NAME_DETAIL_EN": "type_name_detail_en",
    "TYPE_NAME_GROUP": "type_name_group",
}, inplace=True)

# Ensure all column names are lowercase
df.columns = [col.lower() for col in df.columns]

# Keep only expected columns
expected = ["upc", "product_group", "product_name", "business_type",
            "fabric", "gender", "category", "style", "design",
            "color", "size", "type_name_detail_en", "type_name_group"]
df = df[[c for c in expected if c in df.columns]]

print(f"Rows to import: {len(df)}")
print(f"Columns: {list(df.columns)}")
print(f"Sample: {df.head(3).to_dict('records')}")

# Insert into MySQL
df.to_sql("products", con=engine, if_exists="append", index=False, method="multi", chunksize=500)
print("Import complete!")

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'RPS', name: 'INVN_SBS_ITEM' })
export class Product {
  @PrimaryColumn({ name: 'SID', type: 'decimal' })
  id: string;

  @Column({ name: 'DESCRIPTION4', type: 'varchar', nullable: true })
  name: string;

  @Column({ name: 'TEXT1', type: 'varchar', nullable: true })
  nameEn: string;

  @Column({ name: 'TEXT2', type: 'varchar', nullable: true })
  nameVi: string;

  @Column({ name: 'UDF5_STRING', type: 'varchar', nullable: true })
  code: string;

  @Column({ name: 'UDF3_STRING', type: 'varchar', nullable: true })
  priceStr: string;

  @Column({ name: 'ITEM_SIZE', type: 'varchar', nullable: true })
  size: string;

  @Column({ name: 'ATTRIBUTE', type: 'varchar', nullable: true })
  color: string;

  @Column({ name: 'DCS_SID', type: 'decimal', nullable: true })
  categoryId: string;

  @Column({ name: 'ACTIVE', type: 'decimal', nullable: true })
  active: number;
}

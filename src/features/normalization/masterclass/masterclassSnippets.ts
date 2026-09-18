import type { CodeFlavor } from './masterclassTypes'

export interface CodeSnippet {
  title: string
  language: string
  code: string
}

export const codeSnippets: Record<CodeFlavor, CodeSnippet> = {
  sql: {
    title: 'PostgreSQL DDL (Esquema Relacional Normalizado en 3FN)',
    language: 'sql',
    code: `-- Esquema Relacional Normalizado (3FN) - PostgreSQL
-- Creado a partir del análisis documental de la Factura de Venta

CREATE TABLE ciudad (
  ciudad_id VARCHAR(10) PRIMARY KEY,
  nombre_ciudad VARCHAR(80) NOT NULL,
  departamento VARCHAR(80) NOT NULL
);

CREATE TABLE cliente (
  cliente_id VARCHAR(20) PRIMARY KEY,
  nombre_completo VARCHAR(120) NOT NULL,
  telefono VARCHAR(25) NOT NULL,
  direccion VARCHAR(150) NOT NULL,
  ciudad_id VARCHAR(10) NOT NULL,
  CONSTRAINT fk_cliente_ciudad FOREIGN KEY (ciudad_id)
    REFERENCES ciudad(ciudad_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE producto (
  cod_producto VARCHAR(20) PRIMARY KEY,
  nombre_producto VARCHAR(120) NOT NULL,
  precio_catalogo_base NUMERIC(12, 2) NOT NULL CHECK (precio_catalogo_base >= 0)
);

CREATE TABLE factura (
  num_factura VARCHAR(20) PRIMARY KEY,
  fecha DATE NOT NULL,
  cliente_id VARCHAR(20) NOT NULL,
  CONSTRAINT fk_factura_cliente FOREIGN KEY (cliente_id)
    REFERENCES cliente(cliente_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabla asociativa que nace en 2FN y conserva el precio histórico
CREATE TABLE detalle_factura (
  num_factura VARCHAR(20) NOT NULL,
  cod_producto VARCHAR(20) NOT NULL,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario_venta NUMERIC(12, 2) NOT NULL CHECK (precio_unitario_venta >= 0),
  PRIMARY KEY (num_factura, cod_producto),
  CONSTRAINT fk_detalle_factura FOREIGN KEY (num_factura)
    REFERENCES factura(num_factura) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_detalle_producto FOREIGN KEY (cod_producto)
    REFERENCES producto(cod_producto) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Índices recomendados para optimizar consultas de JOIN
CREATE INDEX idx_cliente_ciudad ON cliente(ciudad_id);
CREATE INDEX idx_factura_cliente ON factura(cliente_id);
CREATE INDEX idx_detalle_producto ON detalle_factura(cod_producto);`,
  },
  prisma: {
    title: 'Prisma ORM (TypeScript / Node.js)',
    language: 'prisma',
    code: `// schema.prisma - Mapeo 1:1 de las tablas normalizadas en 3FN

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model City {
  id         String     @id @map("ciudad_id") @db.VarChar(10)
  name       String     @map("nombre_ciudad") @db.VarChar(80)
  department String     @map("departamento") @db.VarChar(80)
  customers  Customer[]

  @@map("ciudad")
}

model Customer {
  id        String    @id @map("cliente_id") @db.VarChar(20)
  fullName  String    @map("nombre_completo") @db.VarChar(120)
  phone     String    @map("telefono") @db.VarChar(25)
  address   String    @map("direccion") @db.VarChar(150)
  cityId    String    @map("ciudad_id") @db.VarChar(10)
  city      City      @relation(fields: [cityId], references: [id], onDelete: Restrict)
  invoices  Invoice[]

  @@map("cliente")
}

model Product {
  code      String          @id @map("cod_producto") @db.VarChar(20)
  name      String          @map("nombre_producto") @db.VarChar(120)
  basePrice Decimal         @map("precio_catalogo_base") @db.Decimal(12, 2)
  details   InvoiceDetail[]

  @@map("producto")
}

model Invoice {
  number     String          @id @map("num_factura") @db.VarChar(20)
  issuedAt   DateTime        @map("fecha") @db.Date
  customerId String          @map("cliente_id") @db.VarChar(20)
  customer   Customer        @relation(fields: [customerId], references: [id], onDelete: Restrict)
  items      InvoiceDetail[]

  @@map("factura")
}

model InvoiceDetail {
  invoiceNumber String   @map("num_factura") @db.VarChar(20)
  productCode   String   @map("cod_producto") @db.VarChar(20)
  quantity      Int      @map("cantidad")
  unitSalePrice Decimal  @map("precio_unitario_venta") @db.Decimal(12, 2)

  invoice       Invoice  @relation(fields: [invoiceNumber], references: [number], onDelete: Cascade)
  product       Product  @relation(fields: [productCode], references: [code], onDelete: Restrict)

  @@id([invoiceNumber, productCode])
  @@map("detalle_factura")
}`,
  },
  jpa: {
    title: 'Spring Boot 3 / Jakarta Persistence (Java 21)',
    language: 'java',
    code: `package com.empresa.facturacion.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "factura")
public class Factura {
    @Id
    @Column(name = "num_factura", length = 20)
    private String numFactura;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @OneToMany(mappedBy = "factura", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleFactura> items;
    // Getters y setters...
}

@Embeddable
public class DetalleFacturaId implements Serializable {
    @Column(name = "num_factura")
    private String numFactura;

    @Column(name = "cod_producto")
    private String codProducto;
    // hashCode y equals obligatorios...
}

@Entity
@Table(name = "detalle_factura")
public class DetalleFactura {
    @EmbeddedId
    private DetalleFacturaId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("numFactura")
    @JoinColumn(name = "num_factura")
    private Factura factura;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("codProducto")
    @JoinColumn(name = "cod_producto")
    private Producto producto;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    // Snapshot inmutable del precio en la fecha de venta
    @Column(name = "precio_unitario_venta", nullable = false, precision = 12, scale = 2)
    private BigDecimal precioUnitarioVenta;
    // Getters y setters...
}`,
  },
  rest: {
    title: 'API REST JSON Payload (Reconstrucción Limpia con JOINs)',
    language: 'json',
    code: `// GET /api/v1/invoices/FACT-1001
// El backend consulta las tablas normalizadas y entrega un JSON
// perfectamente estructurado al frontend, sin duplicidades en almacenamiento.

{
  "invoiceNumber": "FACT-1001",
  "issuedAt": "2026-09-17",
  "customer": {
    "id": "10203040",
    "fullName": "Carlos Mendoza",
    "phone": "3105559876",
    "address": "Calle 45 # 12-30",
    "city": {
      "id": "CIU-01",
      "name": "Medellín",
      "department": "Antioquia"
    }
  },
  "items": [
    {
      "productCode": "PRD-01",
      "description": "Taladro Percutor",
      "quantity": 1,
      "unitSalePrice": 250000.00,
      "lineTotal": 250000.00
    },
    {
      "productCode": "PRD-05",
      "description": "Juego de Brocas",
      "quantity": 2,
      "unitSalePrice": 40000.00,
      "lineTotal": 80000.00
    },
    {
      "productCode": "PRD-12",
      "description": "Cinta Métrica 5m",
      "quantity": 3,
      "unitSalePrice": 15000.00,
      "lineTotal": 45000.00
    }
  ],
  "summary": {
    "subtotal": 375000.00,
    "taxRate": 0.0,
    "total": 375000.00
  }
}`,
  },
}

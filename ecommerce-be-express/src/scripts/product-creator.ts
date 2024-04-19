import { Prisma } from "@prisma/client";
import { prisma } from "../utils/db";
import { forEach } from "lodash";

/**
 * 1. 1개의 상품(+ 상품옵션 3개)을 랜덤으로 생성하는 함수를 작성한다.
 *    a. 상품명, 가격(기본)
 *    b. 상품옵션명, 가격 (0, +1000, + 2000)
 * 2. n개의 상품을 생성하는 함수를 작성한다.
 * 3. DB에 저장하는 함수를 작성한다.
 */

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createProduct(): Prisma.ProductCreateInput {
  const randomNumber = generateRandomNumber(1, 100000);
  const product = [
    "사과",
    "바나나",
    "체리",
    "딸기",
    "오렌지",
    "포도",
    "파인애플",
    "망고",
    "키위",
    "블루베리",
    "당근",
    "상추",
    "시금치",
    "브로콜리",
    "양배추",
    "토마토",
    "가지",
    "오이",
    "콜리플라워",
    "파프리카",
  ][generateRandomNumber(0, 19)];
  const productName = `${product}, ${randomNumber}kg`;
  const price = randomNumber;
  const productOptions = [
    {
      name: `${productName} - A`,
      price: randomNumber,
    },
    {
      name: `${productName} - B`,
      price: randomNumber + 1000,
    },
    {
      name: `${productName} - C`,
      price: randomNumber + 2000,
    },
  ];

  return {
    name: productName,
    price,
    productOptions: {
      create: productOptions,
    },
  };
}

function createProducts(count: number) {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push(createProduct());
  }
  return products;
}

async function insertProducts(products: Prisma.ProductCreateInput[]) {
  try {
    for (const product of products) {
      await prisma.product.create({
        data: product,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

async function handler(count: number) {
  const products = createProducts(count);
  console.log(`${products.length} created!`);
  await insertProducts(products);
  console.log("Done!");
}

/**
 * 100만개의 데이터의 크기는 얼마일까?
 * 1. 1개 row 크기는? 약 100B (Int (4B), UTF-8 (4B))
 *   SELECT AVG(pg_column_size(products.*)) AS avg_row_size FROM products; => 74B
 *
 * 2. 총 row 수는 100만개, 테이블 크기는? 약 1억 바이트 (100 MB)
 *   SELECT
 *    pg_size_pretty(pg_total_relation_size('products')) AS total_size,
 *    pg_size_pretty(pg_relation_size('products')) AS data_size,
 *    pg_size_pretty(pg_total_relation_size('products')) AS data_size,
 *    pg_size_pretty(pg_total_relation_size('products') - pg_relation_size('products')) AS toast_size;
 *
 *  => 총: 96MB, 총 데이터: 75MB, 총 인덱스: 21MB, 총 TOAST: 22MB
 *  - TOAST 테이블은 PostgreSQL에서 큰 필드 데이터를 저장하는 데 사용됨
 */

// handler(1000000);

#!/bin/sh
# Ожидаем готовности MinIO
until (mc alias set minio http://localhost:9000 minioadmin minioadmin) do 
  echo "Waiting for MinIO to start..." 
  sleep 2
done

# Создаем бакет если не существует
mc mb minio/meatway-bucket --ignore-existing

# Настраиваем публичный доступ
mc anonymous set public minio/meatway-bucket

echo "MinIO initialization completed"
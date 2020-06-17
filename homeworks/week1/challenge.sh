#!/bin/bash

read -p "Please input a number, it will output numbers file: " number

for((i=1; i <= ${number}; i=i+1))
do
  touch "${i}.js";
done
echo "檔案建立完成";
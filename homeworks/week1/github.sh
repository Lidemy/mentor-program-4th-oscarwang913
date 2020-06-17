#!/bin/bash

# -s means do not show other information, like progress
read -p "Please enter your GitHub account: " account
curl -s https://api.github.com/users/$account > $account.txt

grep -w 'name' $account.txt | awk -F'\"' '{print $4}'
grep -w 'location' $account.txt | awk -F'\"' '{print $4}'
grep -w 'bio' $account.txt | awk -F'\"' '{print $4}'
grep -w 'blog' $account.txt | awk -F'\"' '{print $4}'


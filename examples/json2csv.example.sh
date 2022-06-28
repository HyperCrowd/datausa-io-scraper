#!/bin/bash
./node_modules/.bin/json2csv --flatten-objects --flatten-arrays --default-value='' -i accountants-auditors.json > occupations.csv
echo >> occupations.csv
./node_modules/.bin/json2csv --no-header --flatten-objects --flatten-arrays --default-value='' -i actors.json >> occupations.csv
echo >> occupations.csv


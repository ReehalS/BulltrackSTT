import csv
import json

def csv_to_JSON(filename):
    with open(filename, 'r') as file:
        reader = csv.reader(file)
        list_of_lists = list(reader)
    return list_of_lists

def write_to_file(data, filename):
    with open(filename, 'w') as file:
        file.write(json.dumps(data, indent=4))

# Use the functions
csv_filename = 'companiesAlphaSort.csv'         # source file here
output_filename = 'output.txt'                  # output file here
data = csv_to_JSON(csv_filename)
write_to_file(data, output_filename)

# The output file is a text file with the data in JSON format
# This can be copy and pasted into keywordsAndCompanies.js
import csv
import operator

def sort_csv_file(file_name):
    data = csv.reader(open(file_name), delimiter=',')
    sorted_data = sorted(data, key=operator.itemgetter(0))  # sort by the first column

    with open('sorted_' + file_name, 'w', newline='') as f: #output file name is 
        writer = csv.writer(f)                              #the source file prefixed with sorted_
        writer.writerows(sorted_data)

sort_csv_file('companiesAlphaSort.csv')                     # source file here
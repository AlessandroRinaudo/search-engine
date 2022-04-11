#!/usr/bin/python3
import itertools
import os
import requests

dirs = os.listdir("../data/")
url = 'http://localhost:3000/api/index/jaccard'

success_cpt = 0
fail_cpt = 0
failed_ids = []

combinations = itertools.combinations(dirs, 2)
total = sum(1 for ignore in combinations)

print("Jaccard distance")

for f1, f2 in itertools.combinations(dirs, 2):
    filename_1 = os.path.splitext(f1)[0]
    filename_2 = os.path.splitext(f2)[0]
    data = {'id_book_1': filename_1, 'id_book_2': filename_2}
    try:
        response = requests.post(url, data)
        if response.status_code == 200:
            success_cpt += 1
        else:
            fail_cpt += 1
            failed_ids.append(filename_1)
            failed_ids.append(filename_2)
        print(
            f"Status {success_cpt + fail_cpt}/{total}, current file id: ({filename_1},{filename_2}) {str(response.content)}")
    except Exception as e:
        fail_cpt += 1
        failed_ids.append(filename_1)
        failed_ids.append(filename_2)

print(f"Total file: {total}")
print("Success : " + str(success_cpt) + ", failed : " + str(fail_cpt) + " with: " + str(failed_ids))

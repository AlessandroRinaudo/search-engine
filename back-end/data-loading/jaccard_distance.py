#!/usr/bin/python3
import itertools
import os
import requests
import time
from collections import defaultdict
start_time = time.time()

dirs = os.listdir("../data/")
url = 'http://localhost:3000/api/index/jaccard'

success_cpt = 0
fail_cpt = 0
failed_ids = []
JACCARD_THRESHOLD = 0.7

combinations = itertools.combinations(dirs, 2)
total = sum(1 for ignore in combinations)

print("Jaccard distance")

results = defaultdict(list)

for f1, f2 in itertools.combinations(dirs, 2):
    filename_1 = os.path.splitext(f1)[0]
    filename_2 = os.path.splitext(f2)[0]
    data = {'id_book_1': filename_1, 'id_book_2': filename_2}
    try:
        response = requests.post(url, data)
        if response.status_code == 200:
            success_cpt += 1
            jsonResponse = response.json()
            res = float(jsonResponse["results"])
            if res < JACCARD_THRESHOLD:
                results[filename_1].append(filename_2)
                results[filename_2].append(filename_1)
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

print(results)
print("--- %s seconds ---" % (time.time() - start_time))
print(f"Total file: {total}")
print("Success : " + str(success_cpt) + ", failed : " + str(fail_cpt) + " with: " + str(failed_ids))


success_cpt = 0
fail_cpt = 0
failed_ids = []
total = len(results)

print("Adding to db")
url = 'http://localhost:3000/api/index/suggested'
for id_book in results:
    data = {"id_book": id_book, "suggested_books": results.get(id_book)}
    response = requests.post(url, data)
    if response.status_code == 200:
        success_cpt += 1
    else:
        fail_cpt += 1
        failed_ids.append(id_book)
    print(
        f"Status {success_cpt + fail_cpt}/{total}, current id: ({id_book}) {str(response.content)}")

print("--- %s seconds ---" % (time.time() - start_time))
print(f"Total file: {total}")
print("Success : " + str(success_cpt) + ", failed : " + str(fail_cpt) + " with: " + str(failed_ids))

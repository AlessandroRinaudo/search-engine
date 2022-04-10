#!/usr/bin/python3
import os
import requests

dirs = os.listdir("../data/")
url = 'http://localhost:3000/api/index/backward'

success_cpt = 0
fail_cpt = 0
failed_ids = []
total = len(dirs)

print("Backward indexing")

for file in dirs:
    filename = os.path.splitext(file)[0]
    data = {'id_book': filename}
    try:
        response = requests.post(url, data)
        if response.status_code == 200:
            success_cpt += 1
        else:
            fail_cpt += 1
            failed_ids.append(filename)
        print(f"Status {success_cpt + fail_cpt}/{total}, current file id: {filename} {str(response.content)}")
    except Exception as e:
        fail_cpt += 1
        failed_ids.append(filename)

print(f"Total file: {total}")
print("Success : " + str(success_cpt) + ", failed : " + str(fail_cpt) + " with: " + str(failed_ids))

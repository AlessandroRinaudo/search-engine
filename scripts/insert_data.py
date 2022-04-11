#!/usr/bin/python3
import os
import requests
import time
startTime = time.time()

dirs = os.listdir("../data/")
url = 'http://localhost:3000/api/index/forward'

success_cpt = 0
fail_cpt = 0
failed_ids = []

for file in dirs:
    filename = os.path.splitext(file)[0]
    data = {'id_book': filename, 'file': file}
    try:
        response = requests.post(url, data)
        if response.status_code == 200:
            success_cpt += 1
        else:
            fail_cpt += 1
            failed_ids.append(filename)
        print("File id: " + filename + ", " + str(response.content))
    except Exception as e:
        fail_cpt += 1
        failed_ids.append(filename)

executionTime = (time.time() - startTime)
print('Execution time in seconds: ' + str(executionTime))
print("Total file: " + str(len(dirs)))
print("Success : " + str(success_cpt) + ", failed : " + str(fail_cpt) + " with: " + str(failed_ids))

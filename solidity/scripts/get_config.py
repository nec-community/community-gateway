import os
import json
import collections

"""
==============
This script is going to fill config.json file with addresses and abi's from last build. 
This means whenever you do "truffle migrate", you need to run this script and update config file.
==============

==============
To run: $ python update_config.py
==============

"""
directory = "../build/contracts"
dict = {}
abi = {}
network_id = 42

for contract in os.listdir(directory):
    if contract.endswith(".json"):
        with open(os.path.join(directory,contract)) as json_contract:
            dictdump = json.loads(json_contract.read())
            if(dictdump.get("networks") == {}):
                continue

            if(dictdump["abi"] != None):
                abi[contract] = dictdump["abi"]
            if(dictdump["networks"].get(str(network_id)) != None ):
                dict[contract] = dictdump["networks"][str(network_id)]["address"]
            else:
                print("{} doesn't have address on network id: {}".format(contract, network_id))

with open("./data.json","r+") as jsonFile:
    data = {}

    for contract in dict:
        c = contract[:-5]
        data[c] = {}
        data[c]['abi'] = abi[contract]
        data[c]['address'] = dict[contract]
        print("Added {} with address: {}".format(c, dict[contract]))

    jsonFile.seek(0)
    json.dump(data, jsonFile)
    jsonFile.truncate()

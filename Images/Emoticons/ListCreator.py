

# import OS module
import os
import shutil



def create_list(path, subpath = ""):
		listdir = os.listdir(path + subpath)
		# Filtering only the files.
		for f in listdir:		
			print(f)
			if os.path.isfile(path + subpath + '/' + f):
				if f.endswith('.svg'):
						with open("list.txt", 'a') as file:
								file.write(subpath + "/" + f + '\n')
			else:
				create_list(path, subpath + '/' + f)

with open("list.txt", 'w') as file:
	file.write("")

dir_path = os.path.dirname(os.path.realpath(__file__))

create_list(dir_path)

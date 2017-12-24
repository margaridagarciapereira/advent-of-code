// --- Day 4: High-Entropy Passphrases --
#include <string>
#include <sstream>
#include <fstream>
#include <iostream>
#include <vector>


using namespace std;

bool IsPassphraseValid(string s) {
	stringstream sstream(s);
	string word;
	vector<string> words;

	while(getline(sstream, word, ' ')) {
		if(find(words.begin(), words.end(), word) != words.end())
			return false;
		words.push_back(word);
	}
	return true;
}

int CountValidPassphrases(){
	ifstream file("day4.txt");
	string temp;
	vector<string> passphrases;

	int validPassphrases = 0;

	while(getline(file, temp)) {
		if(IsPassphraseValid(temp))
			validPassphrases++;		
	}
	return validPassphrases;
}

int main() {
	int validPassphrases = CountValidPassphrases();
	cout << "Valid passphrases: " << validPassphrases << endl;

	return validPassphrases;
}

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

bool IsPassphraseValidAnagram(string s) {
	stringstream sstream(s);
	string word;
	vector<string> words;

	while(getline(sstream, word, ' ')) {
		for(string w : words) {
			sort(w.begin(), w.end());
			sort(word.begin(), word.end());
			if(w == word)
				return false;
		}
		words.push_back(word);
	}	
	return true;
}

int CountValidPassphrases(bool ignoreAnagrams){
	ifstream file("day4.txt");
	string temp;
	vector<string> passphrases;

	int validPassphrases = 0;

	while(getline(file, temp)) {
		if((ignoreAnagrams && IsPassphraseValid(temp)) || (!ignoreAnagrams && IsPassphraseValidAnagram(temp)))
			validPassphrases++;	
	}
	return validPassphrases;
}

int Part1() {
	return CountValidPassphrases(true);
}

int Part2() {
	return CountValidPassphrases(false);
}

int main() {
	cout << "Valid passphrases - Part 1: " << Part1() << endl;
	cout << "Valid passphrases - Part 2: " << Part2() << endl;

	return 0;
}

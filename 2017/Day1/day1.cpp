// --- Day 1: Inverse Captcha ---
#include <iostream>
#include <string>
#include <vector>
#include <fstream>

using namespace std;

///
/// Gets a string of numbers separated by 'delimiter' and returns it as a
/// vector of ints.
///
vector<int> StringSplit(string s, string delimiter) {
	vector<int> numbers;

	while(s.find(delimiter) != string::npos) {
		string token = s.substr(0, s.find(delimiter));
		numbers.push_back(stoi(token));
		s.erase(0, s.find(delimiter) + delimiter.length());
	}

	numbers.push_back(stoi(s));

	return numbers;
}

///
/// Gets a string of digits and splits each digit into one int that is 
/// added to a vector of ints
///
vector<int> ReturnDigits(string s) {
	vector<int> numbers;

	while(!s.empty()) {
		string token = s.substr(0, 1);
		numbers.push_back(stoi(token));
		s.erase(0, 1);
	}

	return numbers;
}

///
/// Reads a file into a string
/// 
string ReadFile(string filename) {
	ifstream file(filename);
 	string temp;
	getline(file, temp);
	return temp;
}

///
/// Return the sum of all digits that match the next digit in the list
///
int Part1(vector<int> numbers) {
	int accumulator = 0;
	int nextIndex = 1;
	for(int i = 0; i < numbers.size(); i++){
		if(i == numbers.size() - 1)
			nextIndex = 0;
		else
			nextIndex = i + 1;

		if(numbers[i] == numbers[nextIndex])
			accumulator += numbers[i];
	}
	return accumulator;
}

///
/// Now, instead of considering the next digit, it wants you to consider
/// the digit halfway around the circular list. That is, if your list 
/// contains 10 items, only include a digit in your sum if the digit 10/2 = 5
/// steps forward matches it. Fortunately, your list has an even number of elements.
///
int Part2(vector<int> numbers) {
	int accumulator = 0;
	int nextIndex = numbers.size()/2 - 1;
	
	for(int i = 0; i < numbers.size(); i++){
		nextIndex++;
		if(nextIndex == numbers.size())
			nextIndex = 0;

		if(numbers[i] == numbers[nextIndex])
			accumulator += numbers[i];
	}
	return accumulator;
}

int main() {
	string sNumbers = ReadFile("day1.txt");

	//vector<int> numbers = StringSplit(sNumbers, ",");
	vector<int> numbers = ReturnDigits(sNumbers);
	
	int accumulator = Part1(numbers);
	cout << "Part 1: " << accumulator << endl;

	accumulator = Part2(numbers);
	cout << "Part 2: " << accumulator << endl;

	return accumulator;
}

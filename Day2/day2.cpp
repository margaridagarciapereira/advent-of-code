// --- Day 2: Corruption Checksum ---
#include <string>
#include <sstream>
#include <fstream>
#include <iostream>
#include <vector>

using namespace std;

vector<int> ParseLine(string s) {
	vector<int> rowNumbers;
	stringstream stream(s);
	int n = 0;
	
   	while(stream >> n)
		rowNumbers.push_back(n);

	return rowNumbers;
}

int DiffMaxAndMin(vector<int> row) {
	int max = *std::max_element(row.begin(), row.end());
	int min = *std::min_element(row.begin(), row.end());

	return max - min;
}

int Part1() {
	int checkSum = 0;

	ifstream file("day2.txt");
	string temp;

	while(getline(file, temp)) {
		vector<int> rowNumbers = ParseLine(temp);
		checkSum += DiffMaxAndMin(rowNumbers);
	}
	return checkSum;
}

int main() {
	cout << "Part1: " << Part1() << endl;

	return 0;
}

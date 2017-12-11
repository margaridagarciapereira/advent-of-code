// --- Day 2: Corruption Checksum ---
#include <string>
#include <sstream>
#include <fstream>
#include <iostream>
#include <vector>
#include <math.h>

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

int EvenDivisionResult(vector<int> row) {
	for(int i = 0; i < row.size() - 1; i++) {
		for(int j = i + 1; j < row.size(); j++) {
			int rem1 = remainder(row[i], row[j]);
			if(rem1 == 0)
				return row[i]/row[j];

			int rem2 = remainder(row[j], row[i]); 
			if(rem2 == 0)
				return row[j]/row[i];
		}
	}
	return 0;
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

int Part2() {
	int checkSum = 0;

	ifstream file("day2.txt");
	string temp;

	while(getline(file, temp)) {
		vector<int> rowNumbers = ParseLine(temp);
		checkSum += EvenDivisionResult(rowNumbers);
	}
	return checkSum;
}

int main() {
	cout << "Part1: " << Part1() << endl;
	cout << "Part2: " << Part2() << endl;
	return 0;
}

// --- Day 5: A Maze of Twisty Trampolines, All Alike ---
#include <vector>
#include <fstream>
#include <iostream>

using namespace std;

vector<int> LoadJumps() {
	ifstream file("day5.txt");
	string temp;
	vector<int> jumps;

	while(getline(file, temp)) {
		jumps.push_back(atoi(temp.c_str()));
		cout << temp << endl;
	}

	return jumps;
}

int RunInstructions(vector<int> jumps) {
	if(jumps.empty())
		return 0;

	int nJumps = 0;
	int currIndex = 0;
	int lastIndex = 0;

	while(true) {
		currIndex += jumps[currIndex];
		nJumps++;
		jumps[lastIndex]++;
		lastIndex = currIndex;

		if(currIndex >= jumps.size() || currIndex < 0)
			break;
		
	}
	return nJumps;
}

int Part1() {
	vector<int> jumps = LoadJumps();
	return RunInstructions(jumps);
}


int main() {
	cout << "Part 1: " << Part1() << endl;

	return 0;	
}

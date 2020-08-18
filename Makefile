all:
	gcc client.c -o client -std=gnu99 -Wall
	gcc server.c -o server -std=gnu99 -Wall
	./server
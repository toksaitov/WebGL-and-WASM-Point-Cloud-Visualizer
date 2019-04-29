CC = emcc

CFLAGS += -s TOTAL_MEMORY=32MB --shell-file shell.html --emrun
CFLAGS += -O0 -g4
CFLAGS += -std=gnu99
CFLAGS += -Ilib/emsc/ -Ilib/sokol/ -Ilib/Handmade-Math/

index.html : index.c
	$(CC) $(CFLAGS) -o $@ $<

.PHONY: clean
clean :
	$(RM) index.html index.js index.wasm index.wast index.wasm.map


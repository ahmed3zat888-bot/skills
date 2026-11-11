# Chess Arena

Single-file browser chess game against a built-in engine, laid out like a mobile/desktop chess app (player bars with clocks, move list, takeback, hint, flip, resign, draw offer, PGN export).

Open `index.html` in any modern browser. No build step, no server. Fonts load from Google Fonts; everything else is inline.

## What is implemented

- Full legal-move generation: castling, en passant, promotion (piece picker), check, checkmate, stalemate, threefold repetition, 50-move rule, insufficient material. Verified with standard perft positions (start position to depth 4, "Kiwipete" to depth 3, and three further reference positions).
- Engine: alpha-beta negamax with quiescence search, MVV-LVA and killer-move ordering, check extensions and iterative deepening, running in a Web Worker so the board stays responsive. Evaluation uses material plus the Simplified Evaluation Function piece-square tables (T. Michniewski).
- Five levels. Levels 1-3 cap search depth and add random noise to move choice; levels 4-5 are time-limited full-strength searches (about 1.5 s and 3 s per move). Levels are not calibrated to any rating scale.
- Click-to-move and drag-and-drop, legal-move dots, last-move and check highlights, right-click squares and arrows, move animation, synthesized move sounds.
- Time controls: unlimited, 3|2, 5|0, 10|0, 15|10.
- The current game is saved in the browser's localStorage and restored on reload.

## Keyboard

Left/Right step through moves, Up/Down jump to start/latest, F flips the board, Esc closes dialogs.

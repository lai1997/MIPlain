marks([x,o]).
mark(M) :- marks(Ms), member(M,Ms).

next_mark(o,x).
next_mark(x,o).

board_(B):- functor(B,b,9).

pos(1). pos(2). pos(3). pos(4). pos(5). pos(6). pos(7). pos(8). pos(9).
line(13). line(17). line(19). line(28). line(37). line(39). line(46). line(79).

inline(1,13). inline(2,13). inline(3,13).
inline(1,17). inline(4,17). inline(7,17).
inline(1,19). inline(5,19). inline(9,19).
inline(2,28). inline(5,28). inline(8,28).
inline(3,37). inline(5,37). inline(7,37).
inline(3,39). inline(6,39). inline(9,39).
inline(4,46). inline(5,46). inline(6,46).
inline(7,79). inline(8,79). inline(9,79).

toplay(o,S) :- toplayO(S).
toplay(x,S) :- toplayX(S).

toplayO(S):- moves_left(S,N), odd(N),!.
toplayX(S):- moves_left(S,N), even(N),!.

moves_left(s(_,_,B1),N) :-
    findall(P,(pos(P),arg(P,B1,e)),Ps),!,
    length(Ps,N).

move(s(o,Z,B1),s(x,Z,B2)):- moveo(B1,B2).
move(s(x,Z,B1),s(o,Z,B2)):- movex(B1,B2).
moveo(B1,B2) :- board_(B1), pos(P), move(o,P,B1,B2).
movex(B1,B2) :- board_(B1), pos(P), move(x,P,B1,B2).

move(X,1,b(e,A,B,C,D,E,F,G,H),b(X,A,B,C,D,E,F,G,H)).
move(X,2,b(A,e,B,C,D,E,F,G,H),b(A,X,B,C,D,E,F,G,H)).
move(X,3,b(A,B,e,C,D,E,F,G,H),b(A,B,X,C,D,E,F,G,H)).
move(X,4,b(A,B,C,e,D,E,F,G,H),b(A,B,C,X,D,E,F,G,H)).
move(X,5,b(A,B,C,D,e,E,F,G,H),b(A,B,C,D,X,E,F,G,H)).
move(X,6,b(A,B,C,D,E,e,F,G,H),b(A,B,C,D,E,X,F,G,H)).
move(X,7,b(A,B,C,D,E,F,e,G,H),b(A,B,C,D,E,F,X,G,H)).
move(X,8,b(A,B,C,D,E,F,G,e,H),b(A,B,C,D,E,F,G,X,H)).
move(X,9,b(A,B,C,D,E,F,G,H,e),b(A,B,C,D,E,F,G,H,X)).

drawn(s(M,_,B)) :- moves_left(s(M,_,B),0), \+(won(s(M,_,B))).

%wonfor(Y,s(X,_,B)) :- board_to_list(B,L),won(L,Y).

won(s(M,_,B)) :- next_mark(M,M1),won_(M1,s(M,_,B)).
won_(X,s(Y,_,B)) :- line(L), forall(inline(U,L),arg(U,B,X)).

even(0).
odd(X) :- succ(X1,X), even(X1).
even(X) :- succ(X1,X), odd(X1).

win_1(A,B):- move(A,B), won(B).
win_2(A,B):- move(A,B), \+(win_1(B,C)), \+((move(B,C), \+(win_1(C,D)))).
win_3(A,B):- move(A,B), \+(win_1(B,C)), \+(win_2(B,C)), \+((move(B,C), \+(win_1(C,D)), \+(win_2(C,D)))).

draw_1(A,B):- move(A,B),\+(win_1(B,C)).
draw_2(A,B):- move(A,B),\+(win_1(B,C)),\+(win_2(B,C)).
draw_3(A,B):- move(A,B),\+(win_1(B,C)),\+(win_2(B,C)),\+(win_3(B,C)).
draw_4(A,B):- move(A,B),\+(win_1(B,C)),\+(win_2(B,C)),\+(win_3(B,C)).

% win strategy
%win_1(A,B):- move(A,B),won(B).
%win_2(A,B):- move(A,B), not(win_1(B,C)), not(move(B,C), not(win_1(C,D))).
%win_3(A,B):- move(A,B), not(win_1(B,C)), not(win_2(B,C)), not(move(B,C), not(win_1(C,D)), not(win_2(C,D))).

% draw strategy
%draw_1(A,B):- move(A,B),not(win_1(B,C)).
%draw_2(A,B):- move(A,B),not(win_1(B,C)),not(win_2(B,C)).
%draw_3(A,B):- move(A,B),not(win_1(B,C)),not(win_2(B,C)),not(win_3(B,C)).
%draw_4(A,B):- move(A,B),not(win_1(B,C)),not(win_2(B,C)),not(win_3(B,C)).
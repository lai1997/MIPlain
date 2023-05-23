%%  MIPlain enables learning of compact winning Noughts-and-Crosses winning strategy
%%  by using feature primitives.

:- user:use_module(library(lists)).
:- use_module(library(lists)).
:- use_module(library(random)).
:- use_module(library(system)).

:- ['./MIGO/METAOPT/metaopt'].
:- ['./MIGO/METAOPT/tree-costs'].
:- ['./MIGO/assign_labels'].
:- ['./MIGO/background'].
:- ['./episode_learning'].
:- ['./MIGO/execute_strategy'].
:- ['./util'].
:- [playox].


%% ---------- METARULES ----------

metarule([P,Q,R],([P,A,B]:-[[Q,A,B],[R,B]])).
metarule([P,Q,B,C,R],([P,A]:-[[Q,A,B,C],[R,A]])).
metarule([P,Q,R],([P,A]:-[[Q,A,B],[R,B]])).
metarule([P,Q,B,D,R,C,E],([P,A]:-[[Q,A,B,D],[R,A,C,E]])).


%% ---------- METAGOL SETTINGS ----------

%%  additional feature primitives
prim(number_of_pairs/3).

%%  move & win classifiers
prim(move/2).
prim(won/1).
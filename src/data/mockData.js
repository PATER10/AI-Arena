// ============================================================
// MOCK DATA – symulowana baza danych SQLite
// ============================================================

// ─── MODELE ────────────────────────────────────────────────
export const MODELS = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    color: '#10b981',
    colorBg: 'rgba(16,185,129,0.1)',
    colorBorder: 'rgba(16,185,129,0.3)',
    avatar: 'GPT',
    costPer1kTokens: 0.005,
    maxTokens: 128000,
    description: 'Flagship multimodal model od OpenAI z najwyższą ogólną wydajnością',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    color: '#f59e0b',
    colorBg: 'rgba(245,158,11,0.1)',
    colorBorder: 'rgba(245,158,11,0.3)',
    avatar: 'CLD',
    costPer1kTokens: 0.003,
    maxTokens: 200000,
    description: 'Wiodący model Anthropic z wyjątkowym rozumowaniem i kodowaniem',
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    color: '#6366f1',
    colorBg: 'rgba(99,102,241,0.1)',
    colorBorder: 'rgba(99,102,241,0.3)',
    avatar: 'GEM',
    costPer1kTokens: 0.0035,
    maxTokens: 1000000,
    description: 'Model Google z najdłuższym oknem kontekstowym na rynku',
  },
  {
    id: 'llama-3-1-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    color: '#ec4899',
    colorBg: 'rgba(236,72,153,0.1)',
    colorBorder: 'rgba(236,72,153,0.3)',
    avatar: 'LLM',
    costPer1kTokens: 0.0009,
    maxTokens: 128000,
    description: 'Open-source model Meta z wydajnością zbliżoną do zamkniętych modeli',
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    color: '#8b5cf6',
    colorBg: 'rgba(139,92,246,0.1)',
    colorBorder: 'rgba(139,92,246,0.3)',
    avatar: 'MST',
    costPer1kTokens: 0.004,
    maxTokens: 32000,
    description: 'Flagowy model Mistral z doskonałą wydajnością w językach europejskich',
  },
];

// ─── KATEGORIE BENCHMARKU ──────────────────────────────────
export const CATEGORIES = [
  { id: 'coding', name: 'Programowanie', icon: '💻', color: '#10b981' },
  { id: 'logic', name: 'Logika i rozumowanie', icon: '🧠', color: '#6366f1' },
  { id: 'summarization', name: 'Streszczanie', icon: '📄', color: '#f59e0b' },
  { id: 'instruction', name: 'Wykonywanie instrukcji', icon: '📋', color: '#ec4899' },
  { id: 'knowledge', name: 'Wiedza ogólna', icon: '🌍', color: '#8b5cf6' },
];

// ─── WARIANTY PROMPTÓW ─────────────────────────────────────
export const PROMPT_VARIANTS = [
  {
    id: 'variant-a',
    label: 'Wariant A',
    name: 'Podstawowy',
    description: 'Samo zadanie – minimalny prompt bez dodatkowego kontekstu',
    color: '#6366f1',
    history: [
      {
        version: 3,
        content: 'Napisz funkcję Python, która znajdzie n-tą liczbę Fibonacciego.',
        timestamp: '2026-10-28T09:15:00Z',
        author: 'patryk@arena.ai',
        note: 'Uproszczona wersja finalna',
      },
      {
        version: 2,
        content: 'Napisz funkcję Python zwracającą n-tą liczbę Fibonacciego. Uwzględnij obsługę błędów.',
        timestamp: '2026-10-25T14:30:00Z',
        author: 'patryk@arena.ai',
        note: 'Dodano wzmiankę o obsłudze błędów',
      },
      {
        version: 1,
        content: 'Napisz funkcję Fibonacci w Pythonie.',
        timestamp: '2026-10-20T10:00:00Z',
        author: 'admin@arena.ai',
        note: 'Wersja początkowa',
      },
    ],
  },
  {
    id: 'variant-b',
    label: 'Wariant B',
    name: 'Z kontekstem',
    description: 'Prompt wzbogacony o kontekst i ograniczenia techniczne',
    color: '#ec4899',
    history: [
      {
        version: 2,
        content: `Jesteś senior developerem Python. Napisz funkcję, która oblicza n-tą liczbę Fibonacciego.

Wymagania:
- Użyj memoizacji lub iteracji (nie rekurencji wykładniczej)
- Obsługuj błędne dane wejściowe (n < 0, n nie jest int)
- Dodaj docstring ze złożonością czasową i pamięciową
- Kod powinien przejść pytesty`,
        timestamp: '2026-10-29T11:00:00Z',
        author: 'patryk@arena.ai',
        note: 'Dodano wymaganie dotyczące testów',
      },
      {
        version: 1,
        content: 'Jako ekspert Python napisz wydajną funkcję Fibonacci z obsługą błędów i dokumentacją.',
        timestamp: '2026-10-20T10:00:00Z',
        author: 'admin@arena.ai',
        note: 'Wersja początkowa',
      },
    ],
  },
  {
    id: 'variant-c',
    label: 'Wariant C',
    name: 'Ustrukturyzowany',
    description: 'Prompt definiujący etapy pracy i oczekiwany format odpowiedzi',
    color: '#10b981',
    history: [
      {
        version: 1,
        content: `Zadanie: Implementacja algorytmu Fibonacciego w Pythonie.

## Etap 1: Analiza
Opisz podejście algorytmiczne (1-2 zdania).

## Etap 2: Implementacja
Napisz pełny, gotowy do użycia kod z następującymi elementami:
- Funkcja \`fibonacci(n: int) -> int\`
- Obsługa wyjątków \`ValueError\` i \`TypeError\`
- Kompletny docstring w formacie Google style
- Złożoność O(n) lub lepsza

## Etap 3: Testy
Podaj minimum 5 przypadków testowych w pytest.

## Format odpowiedzi
Każdy etap oddziel nagłówkiem markdown. Kod umieść w blokach \`\`\`python\`\`\`.`,
        timestamp: '2026-10-20T10:00:00Z',
        author: 'admin@arena.ai',
        note: 'Wersja strukturyzowana',
      },
    ],
  },
];

// ─── ZADANIA BENCHMARKOWE ──────────────────────────────────
export const BENCHMARK_TASKS = [
  {
    id: 'task-001',
    title: 'Fibonacci w Pythonie',
    category: 'coding',
    difficulty: 'medium',
    content: 'Napisz wydajną funkcję obliczającą n-tą liczbę Fibonacciego z obsługą błędów.',
    criteria: ['Poprawność algorytmu', 'Obsługa błędów', 'Dokumentacja', 'Złożoność O(n)', 'Testy jednostkowe'],
    tags: ['python', 'algorytmy', 'rekurencja'],
    status: 'active',
  },
  {
    id: 'task-002',
    title: 'SQL JOIN vs Podzapytania',
    category: 'coding',
    difficulty: 'hard',
    content: 'Wyjaśnij różnice między JOIN a podzapytaniami w SQL. Podaj przykłady użycia i implikacje wydajnościowe.',
    criteria: ['Poprawność techniczna', 'Przykłady kodu', 'Analiza wydajności', 'Czytelność'],
    tags: ['sql', 'bazy danych', 'optymalizacja'],
    status: 'active',
  },
  {
    id: 'task-003',
    title: 'Zagadka mostku',
    category: 'logic',
    difficulty: 'hard',
    content: 'Czterech ludzi musi przejść przez most w nocy. Most wytrzymuje max 2 osoby. Mają 1 latarkę. Czasy przejścia: 1, 2, 5, 10 minut. Jaki jest minimalny czas przejścia wszystkich?',
    criteria: ['Poprawna odpowiedź (17 min)', 'Wyjaśnienie strategii', 'Krok po kroku'],
    tags: ['puzzle', 'optymalizacja', 'matematyka'],
    status: 'active',
  },
  {
    id: 'task-004',
    title: 'Paradoks Monty Hall',
    category: 'logic',
    difficulty: 'hard',
    content: 'Wyjaśnij paradoks Monty Hall. Dlaczego zmiana wyboru drzwi zwiększa szansę wygranej do 2/3?',
    criteria: ['Poprawność matematyczna', 'Intuicyjne wyjaśnienie', 'Dowód/symulacja'],
    tags: ['probabilistyka', 'paradoks', 'matematyka'],
    status: 'active',
  },
  {
    id: 'task-005',
    title: 'Streszczenie artykułu naukowego',
    category: 'summarization',
    difficulty: 'medium',
    content: 'Streść poniższy abstrakt artykułu o kwantowym uczeniu maszynowym w max 3 zdaniach dla niespecjalisty.',
    criteria: ['Zachowanie kluczowych informacji', 'Przystępność języka', 'Odpowiednia długość'],
    tags: ['streszczanie', 'nauka', 'komunikacja'],
    status: 'active',
  },
  {
    id: 'task-006',
    title: 'Raport z danych sprzedażowych',
    category: 'summarization',
    difficulty: 'easy',
    content: 'Na podstawie podanych danych: Q1: 120k, Q2: 145k, Q3: 98k, Q4: 167k. Napisz 2-zdaniowe podsumowanie wyników roku.',
    criteria: ['Dokładność liczb', 'Trend i wnioski', 'Zwięzłość'],
    tags: ['biznes', 'analiza', 'raportowanie'],
    status: 'active',
  },
  {
    id: 'task-007',
    title: 'Email formalny po polsku',
    category: 'instruction',
    difficulty: 'easy',
    content: 'Napisz formalny email do klienta przepraszający za opóźnienie dostawy. Zaproponuj rekompensatę 10% rabatu na następne zamówienie.',
    criteria: ['Formalny ton', 'Przeprosiny', 'Propozycja rekompensaty', 'Poprawność językowa'],
    tags: ['pisanie', 'biznes', 'komunikacja'],
    status: 'active',
  },
  {
    id: 'task-008',
    title: 'Przekształcenie JSON do CSV',
    category: 'instruction',
    difficulty: 'medium',
    content: 'Wykonaj instrukcje: 1) Przekształć podany JSON do CSV. 2) Dodaj kolumnę "total" sumującą pola price * quantity. 3) Sortuj malejąco po "total".',
    criteria: ['Wykonanie kroku 1', 'Wykonanie kroku 2', 'Wykonanie kroku 3', 'Poprawność danych'],
    tags: ['transformacja danych', 'json', 'csv'],
    status: 'active',
  },
  {
    id: 'task-009',
    title: 'Historia kwantowej komputacji',
    category: 'knowledge',
    difficulty: 'medium',
    content: 'Podaj 5 kluczowych kamieni milowych w historii kwantowej komputacji z datami i krótkim opisem każdego.',
    criteria: ['Dokładność historyczna', 'Kompletność 5 pozycji', 'Daty', 'Znaczenie wydarzenia'],
    tags: ['kwantowe', 'historia', 'technologia'],
    status: 'active',
  },
  {
    id: 'task-010',
    title: 'Różnice między ML, DL i AI',
    category: 'knowledge',
    difficulty: 'easy',
    content: 'Wyjaśnij różnice między Sztuczną Inteligencją, Machine Learningiem i Deep Learningiem. Użyj analogii lub diagramu tekstowego.',
    criteria: ['Poprawna hierarchia', 'Jasne wyjaśnienie', 'Przykłady lub analogia'],
    tags: ['ai', 'machine learning', 'definicje'],
    status: 'active',
  },
  {
    id: 'task-011',
    title: 'Implementacja Binary Search',
    category: 'coding',
    difficulty: 'easy',
    content: 'Zaimplementuj algorytm binarnego wyszukiwania w JavaScript. Dodaj obsługę pustej tablicy.',
    criteria: ['Poprawność', 'Obsługa edge cases', 'O(log n) złożoność'],
    tags: ['algorytmy', 'javascript', 'wyszukiwanie'],
    status: 'active',
  },
  {
    id: 'task-012',
    title: 'Zadanie wnioskowania logicznego',
    category: 'logic',
    difficulty: 'medium',
    content: 'Wszyscy programiści piją kawę. Janek pije kawę. Czy Janek jest programistą? Uzasadnij odpowiedź używając logiki formalnej.',
    criteria: ['Poprawna odpowiedź (nie wiadomo)', 'Wyjaśnienie błędu atrybucji', 'Użycie terminologii logicznej'],
    tags: ['logika formalna', 'wnioskowanie', 'filozofia'],
    status: 'active',
  },
];

// ─── EKSPERYMENTY ──────────────────────────────────────────
export const EXPERIMENTS = [
  {
    id: 'exp-001',
    name: 'Fibonacci Challenge – Round 1',
    description: 'Porównanie GPT-4o vs Claude 3.5 Sonnet na zadaniu kodowania Fibonacci',
    taskId: 'task-001',
    models: ['gpt-4o', 'claude-3-5-sonnet'],
    promptVariant: 'variant-b',
    status: 'completed',
    trials: 3,
    temperature: 0.7,
    maxTokens: 2048,
    createdAt: '2026-10-28T09:00:00Z',
    completedAt: '2026-10-28T09:45:00Z',
    results: {
      'gpt-4o': { avgScore: 88.5, avgLatency: 3.2, avgTokens: 487, cost: 0.0024 },
      'claude-3-5-sonnet': { avgScore: 91.2, avgLatency: 2.8, avgTokens: 512, cost: 0.0015 },
    },
  },
  {
    id: 'exp-002',
    name: 'Logic Puzzle Series',
    description: 'Testowanie zdolności logicznych 3 modeli na zestawie 4 zadań',
    taskId: 'task-003',
    models: ['gpt-4o', 'gemini-1-5-pro', 'llama-3-1-70b'],
    promptVariant: 'variant-a',
    status: 'completed',
    trials: 5,
    temperature: 0.3,
    maxTokens: 1024,
    createdAt: '2026-10-29T11:00:00Z',
    completedAt: '2026-10-29T14:20:00Z',
    results: {
      'gpt-4o': { avgScore: 85.0, avgLatency: 2.9, avgTokens: 320, cost: 0.0016 },
      'gemini-1-5-pro': { avgScore: 79.5, avgLatency: 4.1, avgTokens: 285, cost: 0.001 },
      'llama-3-1-70b': { avgScore: 72.3, avgLatency: 5.8, avgTokens: 410, cost: 0.00037 },
    },
  },
  {
    id: 'exp-003',
    name: 'Multilingual Summarization',
    description: 'Ocena zdolności streszczania polskojęzycznych dokumentów',
    taskId: 'task-005',
    models: ['claude-3-5-sonnet', 'mistral-large'],
    promptVariant: 'variant-c',
    status: 'completed',
    trials: 4,
    temperature: 0.5,
    maxTokens: 512,
    createdAt: '2026-10-30T08:30:00Z',
    completedAt: '2026-10-30T10:15:00Z',
    results: {
      'claude-3-5-sonnet': { avgScore: 93.8, avgLatency: 2.1, avgTokens: 180, cost: 0.00054 },
      'mistral-large': { avgScore: 86.4, avgLatency: 3.4, avgTokens: 220, cost: 0.00088 },
    },
  },
  {
    id: 'exp-004',
    name: 'Instruction Following – Full Suite',
    description: 'Kompleksowy test wykonywania wielokrokowych instrukcji na wszystkich 5 modelach',
    taskId: 'task-008',
    models: ['gpt-4o', 'claude-3-5-sonnet', 'gemini-1-5-pro', 'llama-3-1-70b', 'mistral-large'],
    promptVariant: 'variant-c',
    status: 'running',
    trials: 10,
    temperature: 0.1,
    maxTokens: 2048,
    progress: 67,
    createdAt: '2026-11-01T09:00:00Z',
    results: {
      'gpt-4o': { avgScore: 92.1, avgLatency: 3.5, avgTokens: 756, cost: 0.00378 },
      'claude-3-5-sonnet': { avgScore: 90.5, avgLatency: 3.0, avgTokens: 790, cost: 0.00237 },
    },
  },
  {
    id: 'exp-005',
    name: 'Knowledge Depth Test',
    description: 'Draft eksperymentu do oceny głębokości wiedzy domenowej',
    taskId: 'task-009',
    models: ['gpt-4o', 'gemini-1-5-pro'],
    promptVariant: 'variant-a',
    status: 'draft',
    trials: 3,
    temperature: 0.7,
    maxTokens: 1024,
    createdAt: '2026-11-03T16:00:00Z',
    results: {},
  },
];

// ─── WYNIKI EKSPERYMENTÓW (szczegółowe) ────────────────────
export const DETAILED_RESULTS = [
  {
    id: 'res-001',
    experimentId: 'exp-001',
    taskId: 'task-001',
    modelId: 'gpt-4o',
    promptVariant: 'variant-b',
    trial: 1,
    response: `Chętnie pomogę! Oto wydajna implementacja algorytmu Fibonacciego w Pythonie z użyciem memoizacji.

\`\`\`python
from functools import lru_cache
from typing import Union

@lru_cache(maxsize=None)
def fibonacci(n: int) -> int:
    """
    Oblicza n-tą liczbę Fibonacciego z użyciem memoizacji.

    Args:
        n: Indeks liczby Fibonacciego (n >= 0)

    Returns:
        n-ta liczba Fibonacciego

    Raises:
        TypeError: gdy n nie jest int
        ValueError: gdy n < 0

    Time Complexity: O(n)
    Space Complexity: O(n) - dla cache
    """
    if not isinstance(n, int):
        raise TypeError(f"n musi być int, otrzymano {type(n).__name__}")
    if n < 0:
        raise ValueError(f"n musi być >= 0, otrzymano {n}")
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\`

**Testy:**
\`\`\`python
def test_fibonacci():
    assert fibonacci(0) == 0
    assert fibonacci(1) == 1
    assert fibonacci(10) == 55
    assert fibonacci(20) == 6765
    
    with pytest.raises(ValueError):
        fibonacci(-1)
    with pytest.raises(TypeError):
        fibonacci(1.5)
\`\`\``,
    latency: 3.1,
    tokens: 495,
    cost: 0.00248,
    scores: {
      correctness: 4,
      instruction: 5,
      completeness: 4,
      clarity: 5,
      reasoning: 4,
    },
    vote: 'model-b',
    timestamp: '2026-10-28T09:12:00Z',
  },
  {
    id: 'res-002',
    experimentId: 'exp-001',
    taskId: 'task-001',
    modelId: 'claude-3-5-sonnet',
    promptVariant: 'variant-b',
    trial: 1,
    response: `Zaimplementuję algorytm Fibonacciego z iteracyjnym podejściem zapewniającym O(1) złożoność pamięciową.

\`\`\`python
def fibonacci(n: int) -> int:
    """
    Oblicza n-tą liczbę Fibonacciego metodą iteracyjną.

    Parametry:
        n (int): Indeks liczby Fibonacciego, musi być >= 0

    Zwraca:
        int: n-ta liczba Fibonacciego

    Wyjątki:
        TypeError: gdy n nie jest liczbą całkowitą
        ValueError: gdy n jest ujemne

    Złożoność czasowa: O(n)
    Złożoność pamięciowa: O(1) ← lepsza niż memoizacja!
    """
    if not isinstance(n, int) or isinstance(n, bool):
        raise TypeError(f"Oczekiwano int, otrzymano: {type(n).__name__}")
    if n < 0:
        raise ValueError(f"n musi być nieujemne, otrzymano: {n}")
    
    if n <= 1:
        return n
    
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    
    return curr
\`\`\`

**Zalety podejścia iteracyjnego:**
- O(1) złożoność pamięciowa (vs O(n) dla memoizacji)
- Brak ryzyka przepełnienia stosu rekurencji
- Obsługa \`isinstance(n, bool)\` – bo \`bool\` jest podklasą \`int\` w Pythonie!

\`\`\`python
# Testy pytest
import pytest

def test_basic(): assert fibonacci(0) == 0 and fibonacci(1) == 1
def test_sequence(): assert [fibonacci(i) for i in range(8)] == [0,1,1,2,3,5,8,13]
def test_large(): assert fibonacci(50) == 12586269025
def test_negative(): 
    with pytest.raises(ValueError): fibonacci(-1)
def test_float(): 
    with pytest.raises(TypeError): fibonacci(1.5)
def test_bool(): 
    with pytest.raises(TypeError): fibonacci(True)
\`\`\``,
    latency: 2.9,
    tokens: 528,
    cost: 0.00158,
    scores: {
      correctness: 5,
      instruction: 5,
      completeness: 5,
      clarity: 5,
      reasoning: 5,
    },
    vote: 'model-b',
    timestamp: '2026-10-28T09:12:00Z',
  },
];

// ─── WYNIKI ARENA (historia głosowań) ─────────────────────
export const ARENA_VOTES = [
  { id: 'vote-001', modelA: 'gpt-4o', modelB: 'claude-3-5-sonnet', winner: 'model-b', category: 'coding', timestamp: '2026-10-28T09:15:00Z' },
  { id: 'vote-002', modelA: 'gemini-1-5-pro', modelB: 'gpt-4o', winner: 'model-b', category: 'logic', timestamp: '2026-10-28T10:00:00Z' },
  { id: 'vote-003', modelA: 'llama-3-1-70b', modelB: 'mistral-large', winner: 'tie', category: 'knowledge', timestamp: '2026-10-28T11:30:00Z' },
  { id: 'vote-004', modelA: 'claude-3-5-sonnet', modelB: 'mistral-large', winner: 'model-a', category: 'summarization', timestamp: '2026-10-29T09:00:00Z' },
  { id: 'vote-005', modelA: 'gpt-4o', modelB: 'llama-3-1-70b', winner: 'model-a', category: 'instruction', timestamp: '2026-10-29T14:00:00Z' },
  { id: 'vote-006', modelA: 'gemini-1-5-pro', modelB: 'claude-3-5-sonnet', winner: 'model-b', category: 'coding', timestamp: '2026-10-30T09:00:00Z' },
  { id: 'vote-007', modelA: 'mistral-large', modelB: 'gpt-4o', winner: 'model-b', category: 'logic', timestamp: '2026-10-30T11:00:00Z' },
  { id: 'vote-008', modelA: 'llama-3-1-70b', modelB: 'claude-3-5-sonnet', winner: 'both-bad', category: 'knowledge', timestamp: '2026-10-31T10:00:00Z' },
  { id: 'vote-009', modelA: 'gpt-4o', modelB: 'mistral-large', winner: 'model-a', category: 'instruction', timestamp: '2026-11-01T09:00:00Z' },
  { id: 'vote-010', modelA: 'claude-3-5-sonnet', modelB: 'llama-3-1-70b', winner: 'model-a', category: 'summarization', timestamp: '2026-11-01T12:00:00Z' },
];

// ─── STATYSTYKI MODELI (zagregowane) ──────────────────────
export const MODEL_STATS = {
  'gpt-4o': {
    overall: 88.5,
    elo: 1247,
    wins: 18, losses: 7, ties: 3, bothBad: 1,
    byCategory: { coding: 91, logic: 85, summarization: 86, instruction: 92, knowledge: 88 },
    byRubric: { correctness: 90, instruction: 89, completeness: 87, clarity: 92, reasoning: 84 },
    avgLatency: 3.2,
    totalCost: 0.142,
    hallucinations: 2,
    errors: 1,
  },
  'claude-3-5-sonnet': {
    overall: 91.8,
    elo: 1312,
    wins: 22, losses: 4, ties: 2, bothBad: 1,
    byCategory: { coding: 94, logic: 88, summarization: 95, instruction: 91, knowledge: 90 },
    byRubric: { correctness: 94, instruction: 92, completeness: 93, clarity: 91, reasoning: 89 },
    avgLatency: 2.8,
    totalCost: 0.098,
    hallucinations: 0,
    errors: 0,
  },
  'gemini-1-5-pro': {
    overall: 83.2,
    elo: 1189,
    wins: 12, losses: 11, ties: 4, bothBad: 2,
    byCategory: { coding: 85, logic: 80, summarization: 82, instruction: 84, knowledge: 85 },
    byRubric: { correctness: 83, instruction: 84, completeness: 82, clarity: 85, reasoning: 82 },
    avgLatency: 4.1,
    totalCost: 0.087,
    hallucinations: 3,
    errors: 2,
  },
  'llama-3-1-70b': {
    overall: 76.5,
    elo: 1098,
    wins: 8, losses: 16, ties: 4, bothBad: 3,
    byCategory: { coding: 72, logic: 70, summarization: 80, instruction: 78, knowledge: 82 },
    byRubric: { correctness: 74, instruction: 76, completeness: 78, clarity: 80, reasoning: 74 },
    avgLatency: 5.8,
    totalCost: 0.023,
    hallucinations: 7,
    errors: 4,
  },
  'mistral-large': {
    overall: 81.0,
    elo: 1152,
    wins: 10, losses: 13, ties: 5, bothBad: 1,
    byCategory: { coding: 79, logic: 78, summarization: 84, instruction: 82, knowledge: 82 },
    byRubric: { correctness: 80, instruction: 83, completeness: 81, clarity: 82, reasoning: 79 },
    avgLatency: 3.4,
    totalCost: 0.112,
    hallucinations: 4,
    errors: 2,
  },
};

// ─── DANE DO WYKRESÓW ──────────────────────────────────────
export const CATEGORY_CHART_DATA = [
  { name: 'Programowanie', 'GPT-4o': 91, 'Claude 3.5': 94, 'Gemini 1.5': 85, 'Llama 70B': 72, 'Mistral L.': 79 },
  { name: 'Logika', 'GPT-4o': 85, 'Claude 3.5': 88, 'Gemini 1.5': 80, 'Llama 70B': 70, 'Mistral L.': 78 },
  { name: 'Streszczanie', 'GPT-4o': 86, 'Claude 3.5': 95, 'Gemini 1.5': 82, 'Llama 70B': 80, 'Mistral L.': 84 },
  { name: 'Instrukcje', 'GPT-4o': 92, 'Claude 3.5': 91, 'Gemini 1.5': 84, 'Llama 70B': 78, 'Mistral L.': 82 },
  { name: 'Wiedza', 'GPT-4o': 88, 'Claude 3.5': 90, 'Gemini 1.5': 85, 'Llama 70B': 82, 'Mistral L.': 82 },
];

export const RADAR_RUBRIC_DATA = {
  'gpt-4o': [
    { subject: 'Poprawność', value: 90 },
    { subject: 'Instrukcje', value: 89 },
    { subject: 'Kompletność', value: 87 },
    { subject: 'Jasność', value: 92 },
    { subject: 'Uzasadnienie', value: 84 },
  ],
  'claude-3-5-sonnet': [
    { subject: 'Poprawność', value: 94 },
    { subject: 'Instrukcje', value: 92 },
    { subject: 'Kompletność', value: 93 },
    { subject: 'Jasność', value: 91 },
    { subject: 'Uzasadnienie', value: 89 },
  ],
  'gemini-1-5-pro': [
    { subject: 'Poprawność', value: 83 },
    { subject: 'Instrukcje', value: 84 },
    { subject: 'Kompletność', value: 82 },
    { subject: 'Jasność', value: 85 },
    { subject: 'Uzasadnienie', value: 82 },
  ],
  'llama-3-1-70b': [
    { subject: 'Poprawność', value: 74 },
    { subject: 'Instrukcje', value: 76 },
    { subject: 'Kompletność', value: 78 },
    { subject: 'Jasność', value: 80 },
    { subject: 'Uzasadnienie', value: 74 },
  ],
  'mistral-large': [
    { subject: 'Poprawność', value: 80 },
    { subject: 'Instrukcje', value: 83 },
    { subject: 'Kompletność', value: 81 },
    { subject: 'Jasność', value: 82 },
    { subject: 'Uzasadnienie', value: 79 },
  ],
};

// ─── ARENA – przykładowe pary do oceny ────────────────────
export const ARENA_PAIRS = [
  {
    id: 'pair-001',
    task: BENCHMARK_TASKS[0],
    modelA: { id: 'gpt-4o', response: DETAILED_RESULTS[0].response, latency: 3.1, tokens: 495 },
    modelB: { id: 'claude-3-5-sonnet', response: DETAILED_RESULTS[1].response, latency: 2.9, tokens: 528 },
  },
  {
    id: 'pair-002',
    task: BENCHMARK_TASKS[2],
    modelA: { id: 'gemini-1-5-pro', response: `Zagadka mostku to klasyczny problem optymalizacji.

**Odpowiedź: 17 minut**

**Strategia:**
Pary powinny zawsze przechodzić razem, a najszybsza osoba odprowadza latarkę.

Kroki:
1. Osoby 1 i 2 przechodzą razem: **2 minuty**
2. Osoba 1 wraca z latarką: **1 minuta** (łącznie: 3)
3. Osoby 5 i 10 przechodzą razem: **10 minut** (łącznie: 13)
4. Osoba 2 wraca z latarką: **2 minuty** (łącznie: 15)
5. Osoby 1 i 2 przechodzą razem: **2 minuty** (łącznie: **17**)

Kluczem jest wysłanie obu wolnych razem, by zmaksymalizować ich wspólny czas przejścia.`, latency: 4.2, tokens: 310 },
    modelB: { id: 'llama-3-1-70b', response: `Minimalna liczba minut wynosi 17.

Rozwiązanie krok po kroku:
- Krok 1: 1 i 2 idą razem (2 min), 1 wraca (1 min) → 3 min
- Krok 2: 5 i 10 idą razem (10 min), 2 wraca (2 min) → 15 min  
- Krok 3: 1 i 2 idą razem (2 min) → **17 min**

Odpowiedź: 17 minut.`, latency: 5.8, tokens: 285 },
  },
];

// ─── HELPERS ───────────────────────────────────────────────
export const getModelById = (id) => MODELS.find(m => m.id === id);
export const getCategoryById = (id) => CATEGORIES.find(c => c.id === id);
export const getTaskById = (id) => BENCHMARK_TASKS.find(t => t.id === id);

export const computeWeightedScore = (scores) => {
  const weights = {
    correctness: 0.35,
    instruction: 0.25,
    completeness: 0.20,
    clarity: 0.10,
    reasoning: 0.10,
  };
  return Object.entries(weights).reduce((sum, [key, weight]) => {
    return sum + ((scores[key] || 0) / 5) * 100 * weight;
  }, 0);
};

export const formatCost = (cost) => {
  if (cost < 0.001) return `$${(cost * 1000).toFixed(3)}m`;
  return `$${cost.toFixed(4)}`;
};

export const formatLatency = (ms) => `${ms.toFixed(1)}s`;

import { breakTie } from "../../src/domain/RoundRobin";
import { createEmptyEntry, LeaderboardEntry } from "../../src/domain/Leaderboard";
import {
  adef,
  fleush,
  juwk,
  matttInTheHat,
  xwillmarktheplace,
} from "../../src/domain/mocks/MockData";

describe("RoundRobin", () => {
  it("breaks tie of two", () => {
    const entries: LeaderboardEntry[] = [
      {
        ...createEmptyEntry(xwillmarktheplace),
        points: 6,
        opponentResults: [{ opponent: juwk, result: "loss" }],
      },
      {
        ...createEmptyEntry(juwk),
        points: 6,
        opponentResults: [{ opponent: xwillmarktheplace, result: "win" }],
      },
    ];

    const brokenTies = breakTie(entries);
    expect(brokenTies).toHaveLength(2);
    expect(brokenTies).toStrictEqual([
      expect.objectContaining({ user: expect.objectContaining({ name: "juwk" }) }),
      expect.objectContaining({ user: expect.objectContaining({ name: "xwillmarktheplace" }) }),
    ]);
  });

  it("breaks tie of three", () => {
    const entries: LeaderboardEntry[] = [
      {
        ...createEmptyEntry(fleush),
        points: 6,
        opponentResults: [
          { opponent: juwk, result: "loss" },
          { opponent: adef, result: "win" },
          { opponent: matttInTheHat, result: "win" },
          { opponent: xwillmarktheplace, result: "loss" },
        ],
      },
      {
        ...createEmptyEntry(xwillmarktheplace),
        points: 6,
        opponentResults: [
          { opponent: juwk, result: "loss" },
          { opponent: fleush, result: "win" },
          { opponent: matttInTheHat, result: "win" },
          { opponent: adef, result: "win" },
        ],
      },
      {
        ...createEmptyEntry(juwk),
        points: 6,
        opponentResults: [
          { opponent: xwillmarktheplace, result: "win" },
          { opponent: fleush, result: "win" },
        ],
      },
    ];

    const brokenTies = breakTie(entries);
    expect(brokenTies).toStrictEqual([
      expect.objectContaining({ user: expect.objectContaining({ name: juwk.name }) }),
      expect.objectContaining({ user: expect.objectContaining({ name: xwillmarktheplace.name }) }),
      expect.objectContaining({ user: expect.objectContaining({ name: fleush.name }) }),
    ]);
  });

  it("returns all entries, even if there is no information to break the ties on", () => {
    const entries: LeaderboardEntry[] = [
      {
        ...createEmptyEntry(fleush),
        points: 6,
        opponentResults: [],
        median: undefined,
      },
      {
        ...createEmptyEntry(xwillmarktheplace),
        points: 6,
        opponentResults: [],
        median: undefined,
      },
      {
        ...createEmptyEntry(juwk),
        points: 6,
        opponentResults: [],
        median: undefined,
      },
    ];

    const brokenTies = breakTie(entries);
    expect(brokenTies).toHaveLength(3);
    // in any order
    expect(brokenTies).toContainEqual(
      expect.objectContaining({ user: expect.objectContaining({ name: juwk.name }) })
    );
    expect(brokenTies).toContainEqual(
      expect.objectContaining({ user: expect.objectContaining({ name: xwillmarktheplace.name }) })
    );
    expect(brokenTies).toContainEqual(
      expect.objectContaining({ user: expect.objectContaining({ name: fleush.name }) })
    );
  });

  it("breaks head to head ties with median", () => {
    const entries: LeaderboardEntry[] = [
      {
        ...createEmptyEntry(fleush),
        points: 6,
        opponentResults: [
          { opponent: juwk, result: "loss" },
          { opponent: adef, result: "win" },
          { opponent: matttInTheHat, result: "win" },
          { opponent: xwillmarktheplace, result: "win" },
        ],
        median: 1200,
      },
      {
        ...createEmptyEntry(xwillmarktheplace),
        points: 6,
        opponentResults: [
          { opponent: juwk, result: "win" },
          { opponent: fleush, result: "loss" },
          { opponent: matttInTheHat, result: "win" },
          { opponent: adef, result: "win" },
        ],
        median: 1300,
      },
      {
        ...createEmptyEntry(juwk),
        points: 6,
        opponentResults: [
          { opponent: xwillmarktheplace, result: "loss" },
          { opponent: fleush, result: "win" },
        ],
        median: 1000,
      },
    ];

    const brokenTies = breakTie(entries);
    expect(brokenTies).toHaveLength(3);
    expect(brokenTies).toStrictEqual([
      expect.objectContaining({ user: expect.objectContaining({ name: juwk.name }) }),
      expect.objectContaining({ user: expect.objectContaining({ name: fleush.name }) }),
      expect.objectContaining({ user: expect.objectContaining({ name: xwillmarktheplace.name }) }),
    ]);
  });
});

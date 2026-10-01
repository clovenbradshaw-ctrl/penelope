# Penelope

// Handle: Penelope — after the weaver who wove by day and unweaved by
// night: the build assembles the fold, the falsification unweaves what
// does not verify, every night, on the record.

The autonomous app pipeline: a user describes an app in plain words, and
the system remembers (library), derives (box), gets (hunt), and asks the
local mouth only for what none of those can say — usually nothing.

## The tapestry — how generation works now

Kept true by `node gym/check-tapestry.mjs` (source: [TAPESTRY.md](TAPESTRY.md);
history and the evidence for every thread: [GLAUCA-EOT.md](GLAUCA-EOT.md),
append-only, always revisable).

<!-- tapestry:begin -->
```text
╔════════════════════════════════════════════════════════════════════════════╗
║░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒║
║                                                                            ║
║  ,___,                                                                     ║
║  {o,o}      P E N E L O P E                                                ║
║  /)__)      Φ 2026-10-01 Φ                                                 ║
║  -"-"-      ■ □ ·                                                          ║
║                                                                            ║
╠═[ ◦ • Ω ]══════════════════════════════════════════════════════════════════╣
║                                     Ø                                      ║
║  Ω ↓ ◦                                                              ◦ ↑ Ω  ║
║                              ∙∙∙∙∙∙∙·∙∙∙∙∙∙∙                               ║
║                  ↔     ∙∙∙∙∙∙               ∙∙∙∙∙∙     ○                   ║
║                     ∙∙∙                           ∙∙∙                      ║
║                  ∙∙■                                 ·∙∙                   ║
║                 ∙∙            ∙∙∙∙∙∙■∙∙∙∙∙∙            ∙∙                  ║
║              ∙∙∙          ∙∙∙∙∙           ∙∙∙∙∙          ∙∙∙               ║
║              ∙         ∙∙■                     □∙∙         ∙               ║
║             ∙         ∙∙                         ∙∙∙        ∙              ║
║            ∙        ∙∙          ∙∙∙∙■∙∙∙∙          ∙∙        ∙             ║
║       ±   ■∙        ∙        ∙∙·∙       ∙■∙∙        ∙        ∙■   ●        ║
║           ∙        ■        ■∙             ∙■        ■        ∙            ║
║           ∙        ∙        ∙       Φ       ∙        ∙        ∙            ║
║           ∙        ∙        ∙∙             ∙∙        ∙        ∙            ║
║           ∙∙        ∙        °∙∙∙       ∙∙∙■        ∙        ∙∙            ║
║            ∙        ∙∙          ∙■∙∙◦∙∙■∙          ∙∙        ∙             ║
║             ∙        ■∙∙                         ∙∙■        ∙              ║
║              ∙         ∙∙∙                     ∙∙∙         ∙               ║
║           =  ■∙∙          ∙∙∙∙∙           ∙∙∙∙∙          ∙∙·  |            ║
║                 ∙∙            ■∙∙∙∙∙•∙∙∙∙∙■            ∙∙                  ║
║                  ∙∙∙                                 ∙∙∙                   ║
║                     ∙∙∙                           ∙∙∙                      ║
║                        ∙∙∙∙■∙               ∙·∙∙∙∙                         ║
║                              ∙∙∙∙∙∙∙Ω∙∙∙∙∙∙∙                               ║
║                           ◊                   →                            ║
║                                                                            ║
╠═[ Ø ○ ● | → ◊ = ± ↔ ]══════════════════════════════════════════════════════╣
║     ▒      Ø ÷ε  ◦■ •■ Ω·                                                  ║
║   ░   ▓    ○ ≈ε  ◦■ •□ Ω·   ■VDF◦                                          ║
║ ▓       ░  ● ×ε  ◦■ •■ Ω■   ■RDU• ■HNT◦ ■MTH•                              ║
║   ▓   ░    | ÷σ  ◦■ •■ Ω·   ■SNP•                                          ║
║     ▒      → ≈σ  ◦■ •■ Ω·   ■FLD•                                          ║
║   ░   ▓    ◊ ×σ  ◦■ •■ Ω■   ■SELΩ ■EOT•                                    ║
║  ▓     ░   = ÷ι  ◦° •■ Ω■   ■STL•                                          ║
║   ▓   ░    ± ≈ι  ◦■ •■ Ω■   ■PRB• ■TST•                                    ║
║     ▒      ↔ ×ι  ◦· •■ Ω■   ■SPR•                                          ║
║                                                                            ║
║  VDF › RDU › STL › ( FLD √ HNT √ MTH ) › SNP › PRB ∫ SPR › TST › SEL › EOT ║
║  ¶ t=0.475 p=0.026 n=20000                                                 ║
║                                                                            ║
╠═[ ← ▲ ↕ ]══════════════════════════════════════════════════════════════════╣
║  ┌────┬─────────────────────┬─────────────────────┬─────────────────────┐  ║
║  │ ←  │          ÷          │          ≈          │          ×          │  ║
║  ├────┼─────────────────────┼─────────────────────┼─────────────────────┤  ║
║  │ ε  │ Ø ÷ε                │ ○ ≈ε                │ ● ×ε                │  ║
║  │    │ ■GAP ■NLB ·KNL      │ ■VDF □LOK ·KOE ·SCR │ ■RDU ■HNT ■MTH ■CHT │  ║
║  │    │                     │ ·KIN                │ ■ADC ■ADP □CDB ·PAG │  ║
║  │    │                     │                     │ ■VOC                │  ║
║  ├────┼─────────────────────┼─────────────────────┼─────────────────────┤  ║
║  │ σ  │ | ÷σ                │ → ≈σ                │ ◊ ×σ                │  ║
║  │    │ ■SNP ■DOR ·TER ■WSN │ ■FLD ■DTF ■ADM ·NET │ ■SEL ■EOT ■BLD ■ASK │  ║
║  │    │                     │ ■WND ■AGD           │ ■TAP ■LIB □TKB □BPG │  ║
║  │    │                     │                     │ ·HOR ·LFL ·SWT ■CCL │  ║
║  ├────┼─────────────────────┼─────────────────────┼─────────────────────┤  ║
║  │ ι  │ = ÷ι                │ ± ≈ι                │ ↔ ×ι                │  ║
║  │    │ ■STL ■CUB ■LAW ■GLA │ ■PRB ■TST ■CGT ■BHC │ ■SPR ■BOX ·RSM ·DEM │  ║
║  │    │ ·GAT ·STM ■RSR ■STR │ ■FRS ■LDR ■NBK ·RUT │                     │  ║
║  │    │                     │ ·GAR ·MAR ·VIS ·APO │                     │  ║
║  │    │                     │ ·ANS ·POL ·CRV      │                     │  ║
║  └────┴─────────────────────┴─────────────────────┴─────────────────────┘  ║
║  ┌────┬─────────────────────┬─────────────────────┬─────────────────────┐  ║
║  │ ▲  │          ◦          │          •          │          Ω          │  ║
║  ├────┼─────────────────────┼─────────────────────┼─────────────────────┤  ║
║  │ ε  │ ε◦                  │ ε•                  │ εΩ                  │  ║
║  │    │ ■VDF ■HNT ■NLB      │ ■RDU ■MTH ■GAP ■CHT │ ■ADC ■ADP □CDB ·PAG │  ║
║  │    │                     │ □LOK ·KOE ·SCR ■VOC │ ·KIN ·KNL           │  ║
║  ├────┼─────────────────────┼─────────────────────┼─────────────────────┤  ║
║  │ σ  │ σ◦                  │ σ•                  │ σΩ                  │  ║
║  │    │ ■DOR ■ADM ■LIB      │ ■FLD ■SNP ■EOT ■DTF │ ■SEL ■BLD ■ASK ■TAP │  ║
║  │    │                     │ □TKB ·HOR ·SWT ■WND │ □BPG ·LFL ·TER ·NET │  ║
║  │    │                     │ ■AGD ■WSN           │ ■CCL                │  ║
║  ├────┼─────────────────────┼─────────────────────┼─────────────────────┤  ║
║  │ ι  │ ι◦                  │ ι•                  │ ιΩ                  │  ║
║  │    │ ■FRS ·RSM ·APO      │ ■STL ■PRB ■SPR ■TST │ ■CGT ■CUB ■LDR ■BOX │  ║
║  │    │                     │ ■BHC ·RUT ·GAR ·MAR │ ■NBK ■LAW ■GLA ·GAT │  ║
║  │    │                     │ ·VIS ·POL           │ ·DEM ·ANS ·CRV ·STM │  ║
║  │    │                     │                     │ ■RSR ■STR           │  ║
║  └────┴─────────────────────┴─────────────────────┴─────────────────────┘  ║
║  ┌────┬─────────────────────┬─────────────────────┬─────────────────────┐  ║
║  │ ↕  │          ◦          │          •          │          Ω          │  ║
║  ├────┼─────────────────────┼─────────────────────┼─────────────────────┤  ║
║  │ ÷  │ ÷◦                  │ ÷•                  │ ÷Ω                  │  ║
║  │    │ ■NLB ■DOR           │ ■STL ■SNP ■GAP ■WSN │ ■CUB ■LAW ■GLA ·GAT │  ║
║  │    │                     │                     │ ·TER ·KNL ·STM ■RSR │  ║
║  │    │                     │                     │ ■STR                │  ║
║  ├────┼─────────────────────┼─────────────────────┼─────────────────────┤  ║
║  │ ≈  │ ≈◦                  │ ≈•                  │ ≈Ω                  │  ║
║  │    │ ■VDF ■FRS ■ADM ·APO │ ■FLD ■PRB ■TST ■DTF │ ■CGT ■LDR ■NBK ·ANS │  ║
║  │    │                     │ ■BHC □LOK ·KOE ·RUT │ ·CRV ·KIN ·NET      │  ║
║  │    │                     │ ·GAR ·MAR ·VIS ·SCR │                     │  ║
║  │    │                     │ ·POL ■WND ■AGD      │                     │  ║
║  ├────┼─────────────────────┼─────────────────────┼─────────────────────┤  ║
║  │ ×  │ ×◦                  │ ×•                  │ ×Ω                  │  ║
║  │    │ ■HNT ■LIB ·RSM      │ ■RDU ■MTH ■SPR ■EOT │ ■SEL ■BOX ■BLD ■ASK │  ║
║  │    │                     │ ■CHT □TKB ·HOR ·SWT │ ■ADC ■ADP ■TAP □CDB │  ║
║  │    │                     │ ■VOC                │ □BPG ·PAG ·DEM ·LFL │  ║
║  │    │                     │                     │ ■CCL                │  ║
║  └────┴─────────────────────┴─────────────────────┴─────────────────────┘  ║
╠═[ ↑ ↓ ]════════════════════════════════════════════════════════════════════╣
║ ↑ 4  ■NLBØ◦ ■CUB=Ω ■LDR±Ω ■BOX↔Ω ■LAW=Ω ■GLA=Ω ■TAP◊Ω ■LIB◊◦ ·DEM↔Ω        ║
║ │    ·KNLØΩ ·STM=Ω                                                         ║
║ │ 3  ■CHT●• ■BLD◊Ω ■NBK±Ω ■DOR|◦ ■ASK◊Ω ■ADM→◦ ·PAG●Ω ·LFL◊Ω ·TER|Ω        ║
║ │    ·APO±◦                                                                ║
║ │ 2  ■TST±• ■SEL◊Ω ■EOT◊• ■CGT±Ω ■DTF→• ■BHC±• ■FRS±◦ □CDB●Ω □BPG◊Ω        ║
║ │    ·RSM↔◦ ·GAT=Ω ·RUT±• ·VIS±• ·ANS±Ω ·CRV±Ω ·SWT◊• ■WND→• ■AGD→•        ║
║ │    ■CCL◊Ω ■WSN|• ■RSR=Ω ■STR=Ω ■VOC●•                                    ║
║ │ 1  ■VDF○◦ ■RDU●• ■STL=• ■FLD→• ■HNT●◦ ■SNP|• ■PRB±• ■GAPØ• ■ADC●Ω        ║
║ │    ■ADP●Ω □TKB◊• □LOK○• ·HOR◊• ·KOE○• ·MAR±• ·SCR○• ·POL±• ·KIN○Ω        ║
║ │    ·NET→Ω                                                                ║
║ ↓ 0  ■MTH●• ■SPR↔• ·GAR±•                                                  ║
╠═[ ° ■ ]════════════════════════════════════════════════════════════════════╣
║   Ø     ° ° ° ° ° °                                                        ║
║   ∏√Γ√●  ∏ ∏ Γ ● † °                                                       ║
║   ◊     ■ ■ ■ ■ ° °                                                        ║
║                                                                            ║
║░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒║
╚════════════════════════════════════════════════════════════════════════════╝
```

<details><summary>«»</summary>

```text
╔═[ «» ]═════════════════════════════════════════════════════════════════════╗
║  o/=organs/ g/=gym/ l/=ladder/ a/=apps/ E7/=../eoreader7/native/           ║
║  SP/=../eoreader7-screenshot-pipeline/native/ ER7/=../eoreader7/           ║
║  LP/=../live_priors/ FOLD/=../the-fold/                                    ║
║                                                                            ║
║■ ░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒      ║
║■VDF 1 ○◦ ‡ void                                                            ║
║     @ o/generation/engine.mjs E7/organs/void-holarchy.js GL-EN-10 GL-EN-16 ║
║■RDU 1 ●• § read                                                            ║
║     @ o/generation/engine.mjs GL-EN-10                                     ║
║■STL 1 =• ‡ settle                                                          ║
║     @ o/generation/adapters/code.mjs GL-EN-08                              ║
║■FLD 1 →• ‡ field                                                           ║
║     @ o/generation/engine.mjs GL-EN-02 GL-EN-03                            ║
║■HNT 1 ●◦ § hunt                                                            ║
║     @ o/generation/engine.mjs GL-EN-04                                     ║
║■MTH 0 ●• § mouth                                                           ║
║     @ o/generation/engine.mjs o/mouth.mjs mouth/server.mjs GL-EN-05        ║
║     @ GL-LD-05 GL-RR-04 GL-RR-05                                           ║
║■SNP 1 |• § snip                                                            ║
║     @ o/generation/adapters/code.mjs GL-EN-09 GL-RT-02                     ║
║■PRB 1 ±• § probe                                                           ║
║     @ o/generation/engine.mjs GL-EN-07                                     ║
║■SPR 0 ↔• § spiral                                                          ║
║     @ o/generation/engine.mjs GL-EN-06 GL-EN-12                            ║
║■GAP 1 Ø• § gap                                                             ║
║     @ GL-BD-02 GL-OG-04                                                    ║
║■TST 2 ±• § test                                                            ║
║     @ o/generation/engine.mjs GL-BD-01 GL-CD-06                            ║
║■SEL 2 ◊Ω ‡ seal                                                            ║
║     @ a/launch-facing.html a/record.json GL-BD-01 GL-BD-04 GL-RS-03        ║
║■EOT 2 ◊• § record                                                          ║
║     @ o/generation/engine.mjs GL-00 GL-BD-07                               ║
║■CGT 2 ±Ω ‡ gate                                                            ║
║     @ o/consensus-gate.mjs GL-OG-02 GL-OG-03 GL-BD-05                      ║
║■NLB 4 Ø◦ § null                                                            ║
║     @ o/consensus-gate.mjs E7/organs/measure.js GL-01 GL-OG-02             ║
║■DTF 2 →• ‡ detail                                                          ║
║     @ o/detail-fetch.mjs GL-OG-04                                          ║
║■BHC 2 ±• ‡ behave                                                          ║
║     @ o/behavior-check.mjs GL-OG-05 GL-BD-06                               ║
║■FRS 2 ±◦ ‡ fresh                                                           ║
║     @ o/freshness.mjs GL-OG-06                                             ║
║■CUB 4 =Ω ‡ cube                                                            ║
║     @ o/cube.mjs E7/kernel/cube.js GL-CB-01                                ║
║■LDR 4 ±Ω ‡ ladder                                                          ║
║     @ l/r1-r8.json l/r9-r13.json l/r9-r13-record.json GL-LD-01 GL-LD-03    ║
║■BOX 4 ↔Ω § box                                                             ║
║     @ l/mouth-last.json l/nomouth-rows.txt GL-LD-02 GL-LD-06 GL-LD-07      ║
║■CHT 3 ●• ‡ chat                                                            ║
║     @ g/server.mjs g/chat.html GL-CH-01 GL-CH-02                           ║
║■BLD 3 ◊Ω ‡ build                                                           ║
║     @ LOOMS.md GL-BD-03 g/weave-build.mjs /api/weave GL-WV-07 GL-WV-12     ║
║     @ GL-BD-09 GL-BD-10 GL-BD-11 GL-RS-03                                  ║
║■NBK 3 ±Ω ‡ book                                                            ║
║     @ g/to-notebook.mjs penelope-notebook.ipynb GL-NB-01                   ║
║■DOR 3 |◦ ‡ door                                                            ║
║     @ g/server.mjs organs/generation-door.mjs GL-RT-01 GL-RT-04            ║
║     @ /api/chat-stream /api/rung /api/score /api/asks /api/ask /api/answer ║
║     @ /chat /api/chat /api/generate                                        ║
║■ASK 3 ◊Ω ‡ ask-back                                                        ║
║     @ g/server.mjs g/asks.jsonl g/chat.html GL-BD-08                       ║
║■ADM 3 →◦ ‡ admit                                                           ║
║     @ g/server.mjs ER7/heimdall.mjs organs/generation-door.mjs GL-CH-03    ║
║     @ GL-RT-03 GL-RR-05                                                    ║
║■ADC 1 ●Ω ‡ code                                                            ║
║     @ o/generation/adapters/code.mjs GL-EN-01                              ║
║■ADP 1 ●Ω ‡ prose                                                           ║
║     @ o/generation/adapters/prose.mjs GL-EN-11                             ║
║■LAW 4 =Ω ‡ law                                                             ║
║     @ README.md GL-00 GL-01 GL-EN-02                                       ║
║■GLA 4 =Ω § owl                                                             ║
║     @ GLAUCA-EOT.md GL-TP-01                                               ║
║■TAP 4 ◊Ω ‡ loom                                                            ║
║     @ TAPESTRY.md g/tapestry.spec.json g/tapestry.legend.json g/weave.mjs  ║
║     @ g/unweave.mjs g/check-tapestry.mjs GL-TP-02                          ║
║■LIB 4 ◊◦ § library                                                         ║
║     @ LP/derived-priors o/GENERATION-INVENTORY.md GL-01                    ║
║                                                                            ║
║□ ░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒      ║
║□CDB 2 ●Ω ‡ fan                                                             ║
║     @ E7/organs/code-build.js GL-CD-07                                     ║
║□TKB 1 ◊• § talk                                                            ║
║     @ E7/organs/talk-build.js GL-PS-01                                     ║
║□BPG 2 ◊Ω ‡ render                                                          ║
║     @ E7/adapters/build/belief-page.js E7/adapters/build/music-medium.js   ║
║□LOK 1 ○• ‡ look                                                            ║
║     @ E7/organs/look.js GL-IM-01                                           ║
║                                                                            ║
║· ░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒      ║
║·HOR 1 ◊• ‡ set-down                                                        ║
║     @ E7/organs/hora.js ER7/CODING-LESSONS.md GL-EN-14                     ║
║     ±u ∏ ±W ∂†                                                             ║
║·RSM 2 ↔◦ ‡ resume                                                          ║
║     @ E7/kernel/artifact.js E7/docs/THE-LOG-IS-THE-MEMORY.md GL-EN-14      ║
║     resume ≠ run √ Δd ≥ 0 ∂†                                               ║
║·KOE 1 ○• ‡ pointer                                                         ║
║     @ E7/organs/output-holograph.js GL-EN-14                               ║
║     ●u ≠ self √ •u ¢ addr ∂†                                               ║
║·GAT 2 =Ω ‡ gates                                                           ║
║     @ E7/the-fold/spiral-contract.js GL-EN-15                              ║
║     ↓† Λ ¬revise √ ∞revise ∂†                                              ║
║·RUT 2 ±• ‡ show                                                            ║
║     @ E7/organs/build-check.js ER7/ONE-PIPELINE.md                         ║
║     sendØkey ± ok √ always ok ∂†                                           ║
║·PAG 3 ●Ω ‡ create                                                          ║
║     @ E7/organs/hora.js LOOMS.md GL-BD-03                                  ║
║     bare(size↑) flat ∂†                                                    ║
║·DEM 4 ↔Ω ‡ policy                                                          ║
║     @ E7/organs/coding-policy.js E7/organs/coding-policy-trial.js          ║
║     twin ∏ held ∂†                                                         ║
║·LFL 3 ◊Ω ‡ ledger                                                          ║
║     @ E7/organs/long-form.js GL-PS-08                                      ║
║     window ≤ ledger ∂†                                                     ║
║·TER 3 |Ω ‡ tree                                                            ║
║     @ E7/organs/territory.js GL-PS-09                                      ║
║     ¬gain>0 Λ homogeneous ¬split ∂†                                        ║
║·GAR 0 ±• ‡ fact                                                            ║
║     @ E7/organs/gary.js GL-CD-05                                           ║
║     fact-rewrite pass↓ ∂†                                                  ║
║·MAR 1 ±• ‡ copy                                                            ║
║     @ E7/organs/martial.js                                                 ║
║     distinct ¢ finding √ generic ¤ finding ∂†                              ║
║·VIS 2 ±• ‡ eye                                                             ║
║     @ SP/organs/visual-pathos.js SP/organs/visual-hierarchy.js             ║
║     textless ¤ contrast √ flat ¤ pass ∂†                                   ║
║·SCR 1 ○• ‡ pixel                                                           ║
║     @ SP/docs/SCREENSHOT-PIPELINE.md GL-IM-03                              ║
║     1 witness applied ∂†                                                   ║
║·APO 3 ±◦ ‡ pulse                                                           ║
║     @ E7/organs/apollo.js E7/organs/thea.js                                ║
║     steady alarm √ hang ¬alarm ∂†                                          ║
║·ANS 2 ±Ω ‡ answer                                                          ║
║     @ ER7/CODING-LESSONS.md GL-PS-06                                       ║
║     linked Λ ¬answers Λ sealed ∂†                                          ║
║·POL 1 ±• ‡ polar                                                           ║
║     @ ER7/CODING-LESSONS.md GL-PS-05                                       ║
║     negation √ swap √ numword links ∂†                                     ║
║·CRV 2 ±Ω ‡ curve                                                           ║
║     @ SP/organs/visual-pathos.js                                           ║
║     ¬measured Λ verdict ∂†                                                 ║
║·SWT 2 ◊• ‡ swatch                                                          ║
║     @ o/generation/engine.mjs GL-RS-03 GL-WV-05                            ║
║     ∑swatch ≠ ∑{∏ Γ ●} √ notes mouthCalls ≠ ∑swatch ∂†                     ║
║·KIN 1 ○Ω ‡ kind                                                            ║
║     @ E7/kernel/kind-induction.js                                          ║
║     induced ¬beat null ∂†                                                  ║
║·KNL 4 ØΩ ‡ null                                                            ║
║     @ E7/kernel/entity-kind-induction.js GL-LD-07                          ║
║     promote(count) ∏ promote(null) ∂†                                      ║
║·NET 1 →Ω ‡ weave                                                           ║
║     @ FOLD/network.js                                                      ║
║     arrangement recurs Λ ¬bound ∂†                                         ║
║                                                                            ║
║■ ░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒      ║
║■WND 2 →• ‡ window                                                          ║
║     @ o/window.mjs GL-WV-02 GL-LD-06                                       ║
║■AGD 2 →• ‡ agenda                                                          ║
║     @ o/agenda-shape.mjs GL-WV-03 GL-OG-04                                 ║
║■CCL 2 ◊Ω ‡ council                                                         ║
║     @ a/council.html a/council-control.html a/council-facing.html          ║
║     @ a/council-record.json g/probe-council.mjs GL-WV-01                   ║
║     @ /api/council/events /api/council/events/                             ║
║                                                                            ║
║· ░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒      ║
║·STM 4 =Ω ‡ steersman                                                       ║
║     @ o/steersman.mjs o/steersman.test.mjs                                 ║
║     @ LP/derived-priors/concern-priors/concern-fields GL-WV-11 GL-WV-13    ║
║     aporia Ø Λ shadow-topics ¬activate ∂† ∂†                               ║
║                                                                            ║
║■ ░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒░▒▓▒      ║
║■WSN 2 |• ‡ html-snip                                                       ║
║     @ o/html-snip.mjs GL-RS-01 GL-EN-09                                    ║
║■RSR 2 =Ω ‡ resolver                                                        ║
║     @ o/resolver.mjs GL-RS-01 GL-OG-08                                     ║
║■STR 2 =Ω § steersman                                                       ║
║     @ o/steersman.mjs o/steersman.test.mjs GL-WV-13                        ║
║■VOC 2 ●• ‡ voice                                                           ║
║     @ o/voice.mjs o/voice.e2e.mjs GL-WV-13                                 ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
```

</details>
<!-- tapestry:end -->

## Layout

```
organs/    the reusable machinery (pure, self-tested, schema-tagged):
             consensus-gate, detail-fetch, behavior-check, freshness,
             mouth (the decision layer every draw enters: admission,
             kind→wire routing, priority)
mouth/     the mouth as a server (Mouth@1, PENELOPE_MOUTH_PORT 11439):
             /v1/draw, /v1/mouth/admit, the bridge wires — admits, then
             directs the bridge (Heimdall's channel) to execute
ladder/    competency rungs + records (r1-r8 baseline, r9-r13 teeth,
             mouth-last standing order)
apps/      built artifacts (R13 launch app, facing page, controls)
gym/       the live gym (server + chat: prompt the mouths, organs judge)
```

The layout library lives where libraries live:
`live_priors/derived-priors/layout-priors/` (LayoutPrior@1, append-only).

## The line with Odysseus (eoreader7)

Odysseus is the thing in motion: the turn that voyages out through the
doors — reads the world, hunts the feed, suffers the scars, and comes
home. Penelope stays home and holds the pattern: she weaves the fold by
day (assemble from library spec + traced fields) and unweaves by night
(revert the failing patch, dissolve the non-pattern, undo the revision,
demote the mouth's shape to the box).

Correspondences, each with its seam:

| Odysseus (eoreader7) | Penelope (this repo) | the seam |
|---|---|---|
| the voyage (runProxyTurn out the doors) | the loom (gate → library → assembly) | the ledger: his scars are her weft |
| the bridge (the channel, the gate, the host picker, the lanes — he draws what she directs) | the mouth (organs/mouth.mjs + mouth/server.mjs: her admission, her kind→wire routing, her priority) | mouth-last: she decides, he executes — the machinery is never forked |
| the suitors' contest (many claimants) | the gate (many comps, one mode survives the null) | frequency + growth decide, never loudness |
| the bow (only the true king strings it) | the testCommand (only the true build passes) | verification stringed by no other hand |
| nostos, the return to Ithaca | the seal (artifact + facing page) | home is the fold that holds |

What Penelope never does: voyage. What Odysseus never does: weave. The
mouth is HERS (2026-10-01): a draw enters her mouth first, and she directs
the bridge to execute — no model call in the engine draws past her.
Material crosses between them only as addressed record — feed bytes,
comp evidence, scars, verdicts — never as assertion.

## Law (inherited)

Library → box → hunt → mouth. No hardcoded numbers (every bound derives
from a null + a budget). Named gaps, never invented lists. Red rungs
become standing rules, never retries.

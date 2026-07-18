---
dedup:
  primary_topic: "ETH 相对强弱继续修复，但成交与链上需求尚未同步确认"
  topic_tags:
    - BTC
    - ETH
    - 行情
    - ETH/BTC
    - 低杠杆成本
    - 开发者工具
  entities:
    - Bitcoin
    - BTC
    - Ethereum
    - ETH
    - Solana
    - Aave
    - Uniswap Labs
  content_keys:
    - btc-eth-relative-strength-snapshot-2026-07-19
    - solana-developer-changelog-2026-07-16
    - aave-app-governance-proposal-2026-07-13
    - uniswap-trading-tools-launch-2026-07-14
---

# Web3 行情与生态日报｜2026-07-19

> 行情快照：2026-07-19 06:05（北京时间）｜加密资产 24/7 交易，无统一收盘价｜预计阅读：12–15 分钟

> 本文只用于市场学习和风险观察，不构成投资建议，也不读取任何个人持仓或钱包信息。

## 一、三句话看市场

BTC 报 **64,724 美元**、24 小时涨 **1.07%**，ETH 报 **1,860.75 美元**、涨 **1.10%**；价格同步回升，但全市场 24 小时成交额较前一日下降约 **44.4%**，参与广度尚不足以确认趋势。ETH 过去 7 天涨 **2.09%**、30 天涨 **8.98%**，均高于 BTC 的 **0.65%** 和 **2.86%**，ETH/BTC 升至约 **0.02875**，相对强弱继续修复。Deribit 的 BTC、ETH 永续资金费率均为正但很低，标记价对指数价溢价分别只有约 **0.026%**、**0.012%**，这个时点看不到明显的单边杠杆拥挤。

## 二、BTC 与 ETH 行情仪表盘

| 指标 | BTC | ETH | 数据时间与来源 |
|---|---:|---:|---|
| 价格（USD） | $64,724 | $1,860.75 | CoinGecko，06:04 |
| 24 小时涨跌 | +1.07% | +1.10% | CoinGecko，滚动 24 小时 |
| 7 天涨跌 | +0.65% | +2.09% | CoinGecko，滚动 7 天 |
| 30 天涨跌 | +2.86% | +8.98% | CoinGecko，滚动 30 天 |
| 24 小时成交量 | $15.30B | $5.01B | CoinGecko 聚合市场 |
| 30 天年化实现波动 | 32.6% | 46.5% | CoinGecko 31 个日度价格点计算 |
| 30 天区间最大回撤 | -8.9% | -10.0% | 同上，按区间内历史高点计算 |

**补充市场结构**

- **ETH/BTC：约 0.02875。** ETH 的 7 天回报领先 BTC 约 1.43 个百分点、30 天领先约 6.12 个百分点。它说明近期相对价格改善，不等于 Ethereum 使用需求已经同步反转。
- **加密总市值：约 2.294 万亿美元，24 小时 +0.96%。** CoinGecko 口径覆盖 17,645 种活跃资产。
- **BTC 市占率：56.57%。** ETH 市占率为 9.79%；BTC 仍占市场过半，ETH 的相对修复尚未显著改变总体结构。
- **稳定币规模：约 3,065 亿美元。** DefiLlama 最新完整日（7 月 18 日 UTC）的美元锚定币流通量约 3,063 亿美元；不同法币锚定资产折算后总额略高。稳定币规模高只能说明链上“类现金”存量，不代表即将形成方向性买盘。

**计算与口径说明：** 30 天波动率使用 CoinGecko 31 个日度价格点的对数收益标准差并年化；最大回撤按同一区间的滚动峰值计算。它们是历史实现指标，不是未来风险上限。总市值和市占率取 CoinGecko Global API，稳定币取 DefiLlama 聚合 API，因此更新时间和资产收录口径不同。

## 三、杠杆与市场结构

Deribit 公开 API 在 06:05:01 的单平台永续合约数据如下：

| 指标 | BTC-PERPETUAL | ETH-PERPETUAL |
|---|---:|---:|
| 指数价格 | $64,753.68 | $1,862.26 |
| 标记价格 | $64,770.28 | $1,862.49 |
| 标记价相对指数 | +0.0256% | +0.0124% |
| 最新成交价 | $64,767.50 | $1,862.40 |
| 8 小时资金费率 | +0.003007% | +0.001300% |
| 未平仓量 | $755.4M | $281.0M |
| 24 小时名义成交量 | $86.5M | $9.9M |

**[事实]** 两个合约均为正资金费率、标记价略高于指数价，说明多头在这一结算周期支付小幅成本。BTC OI 相比 00:39 的约 7.526 亿美元小幅升至 7.554 亿美元；ETH 本期首次取得可靠数据，暂无连续基线。

**[编辑分析]** 资金费率和基差都很小，并不支持“杠杆已经过热”的判断；但这里只覆盖 Deribit，不能代表 Binance、OKX、Bybit 等全市场。后续应继续积累同一时点的 OI、资金费率与价格序列，观察价格上涨是否伴随 OI 持续扩张。

## 四、链上与资金流

### Ethereum TVL 与 DEX 活动：存量回升，成交仍偏弱

- **Ethereum 链 TVL：约 408.6 亿美元。** DefiLlama 最新完整日（7 月 18 日 UTC）较前一日约 406.1 亿美元增加 **0.61%**。这是按链聚合的美元价值，会同时受到资产价格和净流入影响，不能把美元 TVL 上升全部解释为新增资金。
- **Ethereum DEX 24 小时成交：约 11.24 亿美元。** DefiLlama 汇总显示 7 天约 77.95 亿美元、30 天约 296.22 亿美元，7 天同比前一周期下降约 **12.1%**。不同字段可能对应滚动窗口与完整 UTC 日，因此本文把它用作方向性活动指标，不与单日价格变化强行建立因果。
- **稳定币：美元锚定币约 3,063 亿美元。** 最新完整日较前一日增加约 **2.36 亿美元（0.08%）**，属于缓慢扩张，不足以单独解释 BTC、ETH 当日上涨。

**[编辑分析]** 价格和美元 TVL 同时上升，但 DEX 7 日成交仍弱，说明目前更像“资产价格修复带动存量估值回升”，尚缺少链上交易需求明显扩张的确认。

## 五、著名项目进展

### Solana｜验证器客户端与开发工具集中发布新版本

**事实：** Solana Foundation 7 月 16 日的开发者周报列出多项新版本：Agave 发布 v4.3.0-alpha.1、v4.2.0-beta.1 和 v4.1.2；Firedancer 发布 Testnet v1.1.0；Frankendancer 发布测试网和主网版本。Web3.js 正增加 ZK ElGamal Proof Program 支持，Agave 还在推进 epoch 边界并行加载 stake account hashes、XDP 共享内存和程序上传路径优化。

**为什么重要：** 这不是单一营销发布，而是验证器多客户端、语言 SDK 和测试框架同时迭代。多客户端成熟度有助于降低单一实现故障风险；账户处理和网络路径优化则直接关系到高负载下的吞吐与可用性。

**边界与待验证：** 多个版本仍处于 alpha、beta 或 testnet 阶段，发布不等于主网大规模采用。后续应观察验证器版本占比、客户端故障、主网性能和升级兼容性。

- [Solana Changelog：July 16, 2026](https://solana.com/news/solana-changelog-july-16-2026)

### Aave｜Aave App 提案把协议收益入口做成类金融科技产品

**事实：** Aave Labs 7 月 13 日向治理论坛提交 Aave App Launch 的 ARFC。提案描述了无需用户自行管理 gas 的自托管入口，并通过 Aave Push 的受监管法币转换通道连接银行资金；产品计划加入 Stable Vaults、Balance Protection、ERC-6900 智能账户等能力，净收入拟进入 DAO treasury。

**为什么重要：** 这尝试把 DeFi 借贷基础设施包装成普通用户熟悉的储蓄产品体验，同时把前端商业收入与 DAO 对齐。若落地，Aave 的竞争维度会从“协议流动性”扩展到获客、法币通道和消费者保护。

**边界与待验证：** 目前是治理讨论而非已完成的大规模上线；Aave Labs 是提案方和产品提供方，存在直接商业利益。仍需观察治理最终条款、法币通道覆盖地区、收益来源、费用、Balance Protection 的责任边界和真实用户留存。

- [Aave Governance：Aave App Launch ARFC（2026-07-13）](https://governance.aave.com/t/arfc-aave-app-launch/25307)

### Uniswap Labs｜将自动化链上策略封装成可约束的 AI 工具

**事实：** Uniswap Labs 7 月 14 日发布 Uniswap Trading Tools，包含定投、指数篮子与再平衡、约束式跟随指定钱包三类开源技能。工具支持逐笔确认，也提供支出上限、允许列表、dry-run 和 kill switch 等限制。

**为什么重要：** 产品入口可能从网页操作扩展到代理式工作流。实质变化不在“AI 预测价格”，而在路由、签名、限制条件和重复执行被组织成标准化开发工具。

**边界与待验证：** 这是 Uniswap Labs 的工具公告，不代表协议交易量或手续费增长。Uniswap Labs 对其产品采用存在直接利益，后续需要观察真实活跃开发者、链上执行量、失败率和安全事件。

- [Uniswap Labs：Introducing Uniswap Trading Tools（2026-07-14）](https://blog.uniswap.org/introducing-uniswap-trading-tools)

## 六、行业人物观点

本期最近 7 天内没有找到能够由本人博客、完整演讲或完整访谈核验，且相较既有叙事有实质新增的观点，因此省略。项目或公司公告中的 CEO 宣传性引语不单独包装成“大佬观点”。

## 七、政策、安全与日历

- **最近 24 小时：** 截至 06:05，未发现需要单列、同时能由监管机构或项目原文确认的系统性监管、协议攻击或安全事件。
- **未来 7 天：** 本次核验的官方来源没有确认足以进入日报的重大主网升级、治理截止或监管节点。未采用聚合日历和社交媒体传闻。

## 八、今日风险雷达

- **成交确认不足：** 如果价格继续上涨而全市场成交额持续显著低于前一日，则需要重新评估反弹的参与广度。
- **ETH 相对修复未获链上确认：** 如果 ETH/BTC 继续改善，但 DEX 成交、费用和活跃度没有同步回升，则需要重新评估相对强势是否主要来自价格轮动。
- **杠杆扩张：** 如果 BTC、ETH 的 OI 连续上升、资金费率和标记价溢价同步扩大，则需要重新评估多头拥挤与连锁清算风险。
- **项目落地差距：** 如果 Solana 的测试版升级、Aave App 治理提案和 Uniswap 工具只停留在发布层面，则需要重新评估它们对真实使用与协议收入的影响。
- **聚合数据口径：** CoinGecko 与 DefiLlama 的更新时间、资产覆盖和滚动窗口不同；如果后续出现显著冲突，应降低跨指标结论置信度。

## 九、今日带走

> ETH 的相对价格正在改善，但真正的结构确认仍要看成交、链上活动和杠杆是否以健康方式同步扩张。

## 十、来源与数据口径

- [CoinGecko Markets API](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum&price_change_percentage=24h%2C7d%2C30d)，抓取于 2026-07-19 06:04（北京时间）；价格与涨跌为滚动口径。
- [CoinGecko Global API](https://api.coingecko.com/api/v3/global)，更新时间 2026-07-19 06:00:46（北京时间）。
- [Deribit BTC-PERPETUAL](https://www.deribit.com/api/v2/public/ticker?instrument_name=BTC-PERPETUAL)、[ETH-PERPETUAL](https://www.deribit.com/api/v2/public/ticker?instrument_name=ETH-PERPETUAL)，ticker 时间为 06:05:01；OI 是 Deribit 单平台美元名义口径。
- [DefiLlama Ethereum TVL API](https://api.llama.fi/v2/historicalChainTvl/Ethereum)、[Ethereum DEX API](https://api.llama.fi/overview/dexs/Ethereum)、[Stablecoin API](https://stablecoins.llama.fi/stablecoincharts/all)，链级数据最新完整日为 2026-07-18 UTC。
- 项目进展仅采用 Solana Foundation、Aave Governance 和 Uniswap Labs 原始页面。公告与提案中的产品目标属于发布方口径，本文已单独列出利益关系和待验证边界。

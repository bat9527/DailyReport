---
dedup:
  primary_topic: "低成交量反弹中 ETH 相对 BTC 略有修复，杠杆基线仍待积累"
  topic_tags:
    - BTC
    - ETH
    - 行情
    - 低成交量反弹
    - AI 交易工具
    - 稳定币支付
  entities:
    - Bitcoin
    - BTC
    - Ethereum
    - ETH
    - Uniswap Labs
    - Tether
    - Pact Labs
    - Hyundai
    - Axiym
  content_keys:
    - btc-eth-low-volume-rebound-2026-07-19
    - uniswap-trading-tools-launch-2026-07-14
    - tether-pact-labs-series-a-2026-07-14
    - tether-hyundai-cross-border-poc-2026-07-13
---

# Web3 行情与生态日报｜2026-07-19

> 行情快照：2026-07-19 00:50（北京时间）｜衍生品数据点：00:39｜加密资产 24/7 交易，无统一收盘价｜预计阅读：12–15 分钟

> 本文只用于市场学习和风险观察，不构成投资建议，也不读取任何个人持仓或钱包信息。

## 一、三句话看市场

BTC 报 **64,097 美元**、24 小时约涨 **1.0%**，ETH 报 **1,843 美元**、24 小时约涨 **0.7%**；两者都反弹，但聚合成交量明显低于前一 UTC 日，不能把单日上涨直接写成趋势确认。ETH 过去 7 天约涨 **1.8%**，好于 BTC 的约 **-0.3%**，ETH/BTC 回到 **0.02875**，相对表现出现轻微修复。Deribit 的 BTC 永续资金费率为正但不高，且这是本模块首期、没有历史基线，因此只能记录为“多头付费、拥挤度待积累”。

## 二、BTC 与 ETH 行情仪表盘

| 指标 | BTC | ETH | 数据时间与来源 |
|---|---:|---:|---|
| 价格（USD） | $64,097 | $1,842.99 | CoinGecko，00:50 |
| 24 小时涨跌 | +1.0% | +0.7% | CoinGecko 页面摘要，滚动 24 小时 |
| 7 天涨跌 | -0.3% | +1.8% | CoinGecko 页面摘要，滚动 7 天 |
| 30 天涨跌 | +0.5% | +6.0% | CoinGecko 性能表，滚动 30 天 |
| 24 小时成交量 | $16.1B | $5.27B | CoinGecko 聚合现货市场 |
| 可访问日线波动／回撤代理 | 年化 33.7%／-2.9% | 年化 48.4%／-4.0% | 06-29 至 07-18 UTC 的 20 个可见日线，非完整 30 天 |

**补充市场结构**

- **ETH/BTC：0.02875。** ETH 的 7 天美元回报比 BTC 高约 2.1 个百分点，但 0.02875 仍只是一个相对价格点，不能单独说明生态基本面反转。
- **加密总市值：约 2.28 万亿美元，24 小时 +0.51%。** CoinGecko 口径覆盖 16,618 种资产，并排除包装、跨链和质押衍生代币以减少重复计算。
- **BTC 市占率：56.51%。** BTC 市值约 1.29 万亿美元；ETH 市占率约 9.8%。
- **稳定币总市值：约 3,050 亿美元，占全市场 13.41%。** 这说明“类现金”资产在市场中占比较高，但不能直接推断它们马上会转化为买盘。

**数据冲突说明**

CoinGecko 同一页面的摘要区和性能表存在短时刷新差异：BTC 的 24 小时／7 天在摘要区约为 +1.0%／-0.3%，性能表一度显示 +1.5%／+0.3%；ETH 的 24 小时也在 +0.7% 至 +1.3% 间。本文固定价格与短周期涨跌采用更接近抓取时点的页面摘要，30 天采用性能表，并保留这一局限。

20 日代理使用可公开读取的 UTC 日线收盘序列，按对数收益标准差乘以 √365 计算年化实现波动，最大回撤按序列内历史高点计算。由于本次公开页面只显示 20 个日线点，它不冒充完整 30 天统计；后续日报会用持续归档补足同口径基线。

## 三、杠杆与市场结构

### BTC 永续合约｜Deribit

Deribit `BTC-PERPETUAL` 在 00:39:06 的公开 ticker 显示：

| 指标 | 数值 | 如何理解 |
|---|---:|---|
| 指数价格 | $64,101.05 | 一篮子现货参考价 |
| 标记价格 | $64,122.14 | 高于指数约 $21.09，溢价约 0.033% |
| 最新成交 | $64,119.50 | 单笔成交价，不代表全市场现货 |
| 8 小时资金费率 | +0.003413% | 多头向空头付费，但绝对值不高 |
| 当前资金费率字段 | +0.007901% | 交易所实时估计，可能在结算前变化 |
| 未平仓量 | $752.6M | Deribit 单一交易所口径 |
| 永续 24 小时名义成交量 | $136.1M | 与 CoinGecko 聚合现货量不可直接比较 |

**[编辑分析]** 标记价略高于指数价、资金费率为正，说明这个时点的永续多头愿意支付小幅持仓成本。但没有过去 7 天或 30 天同口径资金费率与 OI 序列，也没有全交易所汇总，不能判断杠杆已经“过热”。首期结论只有一个：建立基线，观察价格上涨时 OI 是否继续放大，以及资金费率是否持续抬升。

### ETH 永续合约｜本次缺失

本次运行无法可靠取得 Deribit `ETH-PERPETUAL` 官方 ticker，因此 ETH 的资金费率、未平仓量、标记价与指数价均标记为 **数据未取得**，不使用二手数字补位。后续运行应继续尝试官方端点；在成功积累前，不对 ETH 杠杆拥挤度下结论。

## 四、链上与资金流

### Ethereum：价格回暖，但主网费用仍处在低位

00:50 附近，CoinGecko 页面引用 Etherscan 的 Gas 指标约 **0.06–0.07 Gwei**。页面同时引用 Token Terminal 聚合值：过去 24 小时 Ethereum 费用约 **216,462 美元**，项目收入约 **42,771 美元**。

这里要区分两个概念：费用是用户为使用网络支付的总额；收入是按数据提供方定义、归属于协议或代币经济的部分，两者并不相等。低 Gas 表明此时主网区块空间并不拥堵；它有利于用户成本，却也意味着不能仅凭 ETH 价格上涨推断链上需求同步增强。

本期未能从 DefiLlama 官方 API 取得带明确时间戳的 Ethereum TVL，因此不填入猜测值。对首期日报而言，保留缺口比混用不同网页、不同统计口径更重要。

## 五、著名项目进展

### Uniswap Labs｜把自动化链上策略封装成 AI 工具

**事实：** Uniswap Labs 7 月 14 日发布 `Uniswap Trading Tools`。这是一个包含三项技能的新插件：定投（dca-bot）、指数篮子与再平衡（index-bot）、在约束内跟随指定钱包交易（copy-trade）。官方称其此前推出的 Uniswap AI 开源技能累计安装量已超过 7,500 次。执行可以逐笔确认，也可以在支出上限、允许列表、dry-run 和 kill switch 等约束下自动运行。

**为什么重要：** DEX 的产品入口可能从网页按钮扩展到代理式工作流。真正的变化不是“AI 会预测价格”，而是开发者能把路由、签名、限制条件和重复执行组织成标准工具。

**边界与待验证：** 这是 Uniswap Labs 的产品与开发者工具公告，不等于 Uniswap Protocol 交易量、手续费或流动性增长。后续应观察真实安装后的活跃开发者、链上执行量、失败率、安全事件，以及 kill switch 等限制是否在实际使用中有效。

- [Uniswap Labs：Introducing Uniswap Trading Tools（2026-07-14）](https://blog.uniswap.org/introducing-uniswap-trading-tools)

### Tether｜稳定币从交易结算继续试探工资与企业财资

**事实一：** 7 月 14 日，Tether 宣布领投 Pact Labs 的 **700 万美元 A 轮**，Blockchange Ventures 和 Lasagna 参投。资金用于把面向美国监管要求设计的 USA₮ 接入工资发放、Earned Wage Access（已赚工资提前领取）、信贷和日常支付等企业系统。

**事实二：** 7 月 13 日，Tether 宣布 Hyundai Motor America 与 Hyundai Motor de México 通过 Axiym、在 Avalanche 上完成企业跨境结算 PoC。第一阶段金额仅 **20,000 美元**：美元兑换为 USD₮、跨境转移、再换回美元；公司称传输与核验平均约 7 分钟。Hyundai Card 负责汇款结构、监管审查、会计和运营框架设计，下一阶段计划探索更多通道与本币结算。

**为什么重要：** 两项进展分别覆盖“企业员工资金流”和“跨境企业财资”。它们测试的是稳定币如何嵌入原有合规、会计和资金管理流程，而不只是链上转账速度。

**边界与待验证：** Tether 是出资方、稳定币发行方和公告发布方，存在直接商业利益。700 万美元融资不代表 USA₮ 已获得大规模工资场景；20,000 美元 PoC 也远不足以证明大额、持续、多币种结算的流动性和成本优势。后续应看真实客户、月度结算量、法币出入金费用、对手方与储备风险、审计以及跨辖区合规结果。

- [Tether：Pact Labs Series A（2026-07-14）](https://tether.io/news/tether-leads-7-million-series-a-in-pact-labs-to-expand-usat-across-payroll-and-payments/)
- [Tether：Hyundai 跨境结算 PoC（2026-07-13）](https://tether.io/news/global-industrial-conglomerate-hyundai-completes-enterprise-treasury-pilot-on-tether-usdt-moving-corporate-funds-across-global-borders/)

## 六、行业人物观点

本期在最近 7 天范围内没有找到足够高质量、可由本人博客、完整演讲或完整访谈核验，并且相较旧观点有真实新增信息的行业人物观点，因此省略。本期也不把公司公告里的 CEO 宣传性引语单独包装成“大佬观点”。

## 七、政策、安全与日历

- **最近 24 小时：** 截至快照时点，没有发现需要单列、同时能由监管机构或项目原文确认的重大加密监管、协议攻击或系统性安全事件。
- **未来 7 天：** 在本次可核验的官方来源中，没有确认到足以进入日报的重大主网升级、治理截止、代币解锁或宏观政策节点。本栏保持空白，不用传闻凑日历。

## 八、今日风险雷达

- **成交确认不足：** 如果 BTC、ETH 继续上涨，而聚合现货成交量持续低于前一日，则需要重新评估反弹的参与广度；单日涨幅本身不等于趋势确认。
- **杠杆基线不足：** 如果 BTC 永续 OI 和资金费率连续数日同步抬升、标记价溢价扩大，则需要重新评估多头拥挤风险；当前只有一个交易所的单点数据。
- **ETH 相对修复尚短：** 如果 ETH/BTC 的改善不能延续，且主网费用、DeFi 活动没有同步回升，则需要重新评估“相对强势”是否只是短期价格波动。
- **稳定币实施风险：** 如果 Pact Labs 或 Hyundai 后续只公布试点而不披露真实规模、总成本与合规结果，则需要重新评估这些公告能否代表可复制采用。
- **数据完整性：** ETH 衍生品与 Ethereum TVL 本期缺失；如果后续仍无法取得同口径数据，应降低对杠杆与链上结论的置信度。

## 九、今日带走

> 价格上涨回答“市场此刻愿意付多少”，成交、杠杆与链上活动才帮助判断这次变化由多少真实参与支持。

## 十、来源与数据口径

- [CoinGecko：Bitcoin](https://www.coingecko.com/en/coins/bitcoin)、[Bitcoin Historical Data](https://www.coingecko.com/en/coins/bitcoin/historical_data)，抓取于 2026-07-19 00:50（北京时间）。
- [CoinGecko：Ethereum](https://www.coingecko.com/en/coins/ethereum)、[Ethereum Historical Data](https://www.coingecko.com/en/coins/ethereum/historical_data)，抓取于 00:50；Gas 由页面引用 Etherscan，费用与收入由页面引用 Token Terminal。
- [CoinGecko：Global Market Charts](https://www.coingecko.com/en/charts)，抓取于 00:50；总市值会随页面刷新持续变化。
- [Deribit Public API：BTC-PERPETUAL](https://www.deribit.com/api/v2/public/ticker?instrument_name=BTC-PERPETUAL)，ticker 时间戳为 2026-07-19 00:39:06（北京时间）；OI 为 Deribit 单平台美元名义口径。
- 项目进展均引用 Uniswap Labs 与 Tether 官方公告；公告中的采用、速度和规模数字是公司口径，尚未经过独立验证。
- 本期是 Web3 模块首份归档。30 天实现波动、回撤、资金费率和 OI 的连续基线将从本期开始积累，缺失项不做估算。

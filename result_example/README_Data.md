# 数据介绍

## `train_data` File

- **时间范围**：2021-01-01 - 2024-12-31.
- **数据结构**：每个文件代表一个股票，包含以下字段：
   - `timestamp`: 时间戳
   - `open_price`：开盘价
   - `high_price`：最高价
   - `low_price`：最低价
   - `close_price`：收盘价
   - `volume`：成交量（股票成交数）
   - `amount`：成交额（= 成交量 * 价格）
   - `count`：成交笔数
   - `but_volume`：买方成交量
   - `but_amount`：买方成交额

## `submission_id.csv` File

这是生成的预测数据的格式要求。包含需要预测的股票代码和时间（**注意，不是仅预测下一时刻的数据，而是要预测文件中给出的所有时间和股票的数据，这些数据在训练集中都是空缺的。一共 2000 万个数据**）

如果某数据没有预测值，用 0 填充，不要空缺

## `sample_submission.csv` File

这是目标生成结果的样例，一共是两列，`id` 和 `predic_return`，前者由 `submission_id.csv` 文件给出，后者是预测的收益率
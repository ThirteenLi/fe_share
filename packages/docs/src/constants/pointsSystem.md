# Points System（testing version）

### What is Capell Points?

Points are a reward mechanism. They can be exchanged for tokens issued by Capell, adding extra value to your participation in our system.

### How Can You Earn Points?

You earn points by providing us with your idle node resources. Whether or not these resources are used by buyers, you will still receive points. However, it is important to note that your node must meet the minimum criteria for point rewards.

### How Many Points Can You Earn?

Points are calculated based on the following formula:

![image](/posyimage1.png)

We perform an airdrop every 30 minutes, and your total points are the sum of the points each node earns per airdrop.

### What Are the Minimum Configuration Requirements for Service Nodes?

To earn points, your node needs to meet the following minimum criteria:

| Service Node Configuration | Minimum Criteria          |
| -------------------------- | ------------------------- |
| Bandwidth                  | ≥ 1 Gbps                  |
| CPU                        | ≥ 16 cores                |
| Memory                     | ≥ 32 GB                   |
| Disk                       | ≥ 2,200 GB SSD            |
| Virtualization Support     | Required,must support KVM |

### How Are Points Specifically Calculated?

#### Bandwidth Score (BS)

BS = a × Bandwidth (Gbps)

![image](/posyimage2.png)

- The graph indicates that the higher the bandwidth, the higher the score.

#### Stability Score (SS)

SSₙ = (xₙ₋₁ + β)² + 0.5
![image](/posyimage3.png)
![image](/posyimage4.png)

- Continuous online status boosts the stability score.
- Offline leads to a rapid score drop; keep nodes online.

#### Validity Score (VS)

Continuous online presence during the airdrop period scores 1 point. Offline presence scores 0.

| Node's State | Validity Score |
| ------------ | -------------- |
| Online       | 1              |
| Offline      | 0              |

- Makes your node Online to get more token.

export type AnchorEscrow = {
  "version": "0.1.0",
  "name": "anchor_escrow",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "takerKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerReceiveMintAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "randomSeed",
          "type": "u64"
        },
        {
          "name": "initializerAmount",
          "type": "u64"
        },
        {
          "name": "takerAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancel",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "initializerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "exchange",
      "accounts": [
        {
          "name": "taker",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "initializerDepositTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "takerDepositTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "takerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "takerReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "escrowState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "randomSeed",
            "type": "u64"
          },
          {
            "name": "initializerKey",
            "type": "publicKey"
          },
          {
            "name": "takerKey",
            "type": "publicKey"
          },
          {
            "name": "initializerDepositTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "initializerReceiveTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "initializerDepositMintAccount",
            "type": "publicKey"
          },
          {
            "name": "initializerReceiveMintAccount",
            "type": "publicKey"
          },
          {
            "name": "initializerAmount",
            "type": "u64"
          },
          {
            "name": "takerAmount",
            "type": "u64"
          },
          {
            "name": "vaultAuthorityBump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

export const IDL: AnchorEscrow = {
  "version": "0.1.0",
  "name": "anchor_escrow",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "takerKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerReceiveMintAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "randomSeed",
          "type": "u64"
        },
        {
          "name": "initializerAmount",
          "type": "u64"
        },
        {
          "name": "takerAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancel",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "initializerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "exchange",
      "accounts": [
        {
          "name": "taker",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "initializerDepositTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "takerDepositTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "takerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "takerReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "escrowState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "randomSeed",
            "type": "u64"
          },
          {
            "name": "initializerKey",
            "type": "publicKey"
          },
          {
            "name": "takerKey",
            "type": "publicKey"
          },
          {
            "name": "initializerDepositTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "initializerReceiveTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "initializerDepositMintAccount",
            "type": "publicKey"
          },
          {
            "name": "initializerReceiveMintAccount",
            "type": "publicKey"
          },
          {
            "name": "initializerAmount",
            "type": "u64"
          },
          {
            "name": "takerAmount",
            "type": "u64"
          },
          {
            "name": "vaultAuthorityBump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

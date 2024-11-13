import { Alert } from 'react-native';
import db from './openDB';

// Table Name
const tableName = 'wallet';

// Create Table
export const createWalletTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ' + tableName +
            ' (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50) NOT NULL, balance FLOAT NOT NULL);',
            [],
            () => {
                console.log('createdWallet');
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Wallet
export const getWallet = (setWallet) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName,
            [],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        result.push({
                            id: row.id,
                            name: row.name,
                            balance: row.balance
                        })
                    }
                }
                else {
                    console.log('empty getWallet');
                }
                setWallet(result.sort((a, b) => (a.name < b.name ? 1 : -1)));
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Total Wallets
export const getTotalWallets = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName,
            [],
            (tx, results) => {
                var len = results.rows.length;
                return len;
           },
            error => {
                console.log(error);
            }
        );
    });
}

// Insert Wallet
export const insertWallet = (item) => {
    if (item.name.length == 0 || item.balance < 0) {
        return true
    } else {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO ' + tableName + '(name, balance) VALUES(?,?);',
                [item.name, item.balance],
                () => {
                    console.log('inserted wallet');
                },
                error => {
                    console.log(error);
                }
            );
        });
        return false
    }
}

// Update Wallet
export const updateWallet = (item) => {
    if (item.name.length == 0 || item.balance <= 0) {
        return true
    }
    else {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE ' + tableName + ' SET name = ?, balance = ? WHERE id = ?',
                [item.name, item.balance, item.id],
                () => {
                    console.log('updated');
                },
                error => {
                    console.log(error);
                }
            );
        });
        return false
    }
}

// Delete Wallet
export const deleteWallet = (id) => {
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM ' + tableName + ' WHERE id = ?',
            [id],
            () => {
                console.log('deleted');
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Drop Table
export const deleteWalletTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `drop table ${tableName}`,
            [],
            () => {
                console.log('deleted');
            },
            error => {
                console.log(error);
            }
        );
    });
}
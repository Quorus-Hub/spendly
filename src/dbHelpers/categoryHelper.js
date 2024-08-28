import { Alert } from 'react-native';
import db from './openDB';

// Table Name
const tableName = 'category';

// Create Table
export const createCategoryTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ' + tableName +
            ' (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50) NOT NULL, icon VARCHAR(50) NOT NULL, color VARCHAR(50) NOT NULL);',
            [],
            () => {
                console.log('createdCategory');
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Category
export const getCategory = (setCategory) => {
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
                            icon: row.icon,
                            color: row.color
                        })
                    }
                }
                else {
                    console.log('empty');
                }
                setCategory(result.sort((a, b) => (a.name > b.name ? 1 : -1)));
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Insert Category
export const insertCategory = (item) => {
    if (item.name.length == 0 || item.icon == 0 || item.color == 0) {
        return true
    } else {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO ' + tableName + '(name, icon, color) VALUES(?,?,?);',
                [item.name, item.icon, item.color],
                () => {
                    console.log('inserted');
                },
                error => {
                    console.log(error);
                }
            );
        });
        return false
    }
}

// Update Category
export const updateCategory = (item) => {
    if (item.name.length == 0 || item.icon == 0 || item.color == 0) {
        return true
    }
    else {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE ' + tableName + ' SET name = ?, icon = ?, color = ? WHERE id = ?',
                [item.name, item.icon, item.color, item.id],
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

// Delete Category
export const deleteCategory = (id) => {
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
export const deleteCategoryTable = () => {
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
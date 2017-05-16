import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import {getNodeAtPath, addNodeUnderParent, removeNodeAtPath} from 'react-sortable-tree';
import FaTrash from 'react-icons/lib/fa/trash';



class SkillTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [
                {   title: 'Root',
                    expanded: true,
                    children: [
                        {   title: 'Pizza',
                            expanded: true,
                            children: [
                                {   title: 'Viggie-Pizza',
                                    children: [
                                        { title: 'Margherita', },
                                    ]
                                }
                            ]
                        },
                        {   title: 'Topping',
                            expanded: true,
                            children: [
                                {   title: 'Veggie-Topping',
                                    children: [
                                        {title: 'Mushroom'},
                                        {title: 'Tomato'}
                                    ]
                                },
                                {   title: 'Cheese-Topping',
                                    children: [
                                        { title: 'Mozzarella' }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
        };

        this.updateSkillTreeData = this.updateSkillTreeData.bind(this);
        this.addNode = this.addNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
    }

    addNode(rowInfo){
        let NEW_NODE = {title: ''};
        let {node, treeIndex, path} = rowInfo;

        let parentNode = getNodeAtPath({
            treeData: this.state.treeData,
            path : path,
            getNodeKey: ({ treeIndex }) =>  treeIndex,
            ignoreCollapsed : true
        });

        let getNodeKey = ({ node: object, treeIndex: number }) => {
            return number;
        };

        let parentKey = getNodeKey(parentNode);
        if(parentKey == -1) {
            parentKey = null;
        }
        let newTree = addNodeUnderParent({
                treeData: this.state.treeData,
                newNode: NEW_NODE,
                expandParent: true,
                parentKey: parentKey,
                getNodeKey: ({ treeIndex }) =>  treeIndex
         });

         this.setState({treeData: newTree.treeData});


    }

    removeNode(rowInfo){
        let {node, treeIndex, path} = rowInfo;
        this.setState({ treeData : removeNodeAtPath({
                                    treeData: this.state.treeData,
                                    path: path,   // You can use path from here
                                    getNodeKey: ({node: TreeNode, treeIndex: number}) => {
                                        // console.log(number);
                                        return number;
                                    },
                                    ignoreCollapsed: false,
                                })
        });
    }



    updateSkillTreeData(treeData){
        this.setState({ treeData })
    }

    render() {
        return (
            <div style={{ height: 1000 }}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={this.updateSkillTreeData}
                    generateNodeProps={rowInfo => ({
                        buttons: [
                            //<div style={divStyle}>
                            <div>
                            {/*<TextField
                              hintText=""
                              multiLine={true}
                              rows={1}
                              rowsMax={4}
                            />*/}
                            <br />
                            <button label='Delete'
                                   onClick={(event) => this.removeNode(rowInfo)}><FaTrash/></button>
                            <button label='Add'
                                   onClick={(event) => this.addNode(rowInfo)}>+</button>
                            </div>,
                        ],
                        style: { height: '50px',}
                    })}
                />
            </div>
        );
    }
}

export default SkillTree;

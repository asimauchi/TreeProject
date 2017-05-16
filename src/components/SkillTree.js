import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import {getNodeAtPath, addNodeUnderParent, removeNodeAtPath, toggleExpandedForAll} from 'react-sortable-tree';
import FaTrash from 'react-icons/lib/fa/trash';



class SkillTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
          searchString: '',
          searchFocusIndex: 0,
          searchFoundCount: null,
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

        this.collapseAll    = this.collapseAll.bind(this);
        this.expandAll      = this.expandAll.bind(this);
        this.updateSkillTreeData = this.updateSkillTreeData.bind(this);
        this.addNode = this.addNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
    }

    expand(expanded){
      this.setState({
        treeData: toggleExpandedForAll({
          treeData: this.state.treeData,
          expanded,
        }),
      });
    }

    collapseAll(){
      this.expand(false);
    }

    expandAll(){
      this.expand(true);
    }

    addNode(rowInfo){
        let NEW_NODE = {title: ''};
        let {path} = rowInfo;

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
        if(parentKey === -1) {
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
        let {path} = rowInfo;
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
                <button onClick={this.expandAll}>
                    Expand All
                </button>

                <button onClick={this.collapseAll}>
                    Collapse All
                </button>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={this.updateSkillTreeData}
                    generateNodeProps={rowInfo => ({
                        buttons: [
                            <button label='Delete'
                                   onClick={(event) => this.removeNode(rowInfo)}><FaTrash/></button>,
                            <button label='Add'
                                   onClick={(event) => this.addNode(rowInfo)}>+</button>

                        ],
                        style: { height: '50px',}
                    })}
                />
            </div>
        );
    }
}

export default SkillTree;

// Add below to buttons array in generateNodeProps after constructing TextField
// component

/*//<div style={divStyle}>
{/*<TextField
  hintText=""
  multiLine={true}
  rows={1}
  rowsMax={4}
/>*
<br />*/

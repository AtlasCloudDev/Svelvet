<script type="ts">
  import Svelvet from "$lib/container/views/Svelvet.svelte";
  let initialNodes = [
    {
      id: 1,
      position: { x: 225, y: 10 },
      data: { label: "Add Images!" },
      width: 100,
      height: 100,
      bgColor: "white",
      borderColor: "transparent",
      image: true,
      src: "https://svelvet.io/_app/assets/Logo%201-cc7b0baf.svg",
    },
    {
      id: 2,
      position: { x: 390, y: 180 },
      data: { label: "Mixed Anchors" },
      width: 125,
      height: 40,
      bgColor: "white",
      textColor: "black",
      targetPosition: "left",
    },
    {
      id: 3,
      position: { x: 225, y: 260 },
      data: { label: "Output Node" },
      width: 100,
      height: 40,
      bgColor: "white",
      textColor: "black",
    },
    {
      id: 4,
      position: { x: 25, y: 180 },
      data: { label: "Drag me!" },
      width: 125,
      height: 40,
      bgColor: "white",
      textColor: "black",
      targetPosition: "right",
    },
    {
      id: 5,
      position: { x: 390, y: 380 },
      data: { label: "Custom Nodeaaaa" },
      width: 125,
      height: 40,
      bgColor: "green",
      textColor: "black",
      borderColor: "transparent",
      borderRadius: 0,
    },
    {
      id: 6,
      position: { x: 47.5, y: 360 },
      data: { label: "Custom Nodebbb" },
      width: 80,
      height: 80,
      borderColor: "#FF4121",
      borderRadius: 30,
      bgColor: "grey",
      textColor: "#FF4121",
      targetPosition: "right",
      sourcePosition: "right",
    },
  ];

  let initialEdges = [
    { id: "e1-2", source: 1, target: 2, label: "edge label" },
    {
      id: "e2-3",
      source: 2,
      target: 3,
      animate: true,
      label: "animated edges",
    },
    {
      id: "e1-4",
      source: 1,
      target: 4,
      type: "step",
      animate: true,
      edgeColor: "#FF4121",
    },
    {
      id: "e2-5",
      source: 2,
      target: 5,
      label: "colored edges",
      animate: true,
      arrow: true,
      edgeColor: "#FF4121",
      labelBgColor: "#1F2937",
      labelTextColor: "#FFE4E6",
    },
    { id: "e2-6", source: 4, target: 6, type: "straight" },
    {
      id: "e2-7",
      source: 3,
      target: 6,
      type: "smoothstep",
      label: "colored label",
      labelBgColor: "#FF4561",
      labelTextColor: "white",
      animate: true,
    },
  ];

  let name = "world";

  let drop_zone;
  let objects = [
    { el: null, id: 1 },
    { el: null, id: 2 },
    { el: null, id: 3 },
  ];

  let dropped = [];
  let status = "";

  let dropped_in: boolean;
  let activeEvent = "";
  let originalX = "";
  let originalY = "";

  function handleDragEnter(e) {
    status = "You are dragging over the " + e.target.getAttribute("id");
  }

  function handleDragLeave(e) {
    status = "You left the " + e.target.getAttribute("id");
  }

  function handleDragDrop(e) {
    console.log('drop')
    e.preventDefault();
    var element_id = e.dataTransfer.getData("text");
    dropped = dropped.concat(element_id);
    dropped_in = true;
    status = "You droped " + element_id + " into drop zone";
  }

  function handleDragStart(e) {
    status = "Dragging the element " + e.target.getAttribute("id");
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("text", e.target.getAttribute("id"));
  }

  function handleDragEnd(e) {
    console.log('dragend')
    let pageX = parseInt(e.target.style.left) - 50;
      let pageY = parseInt(e.target.style.top) - 50;
    if (!drop_zone) {
      drop_zone = document.getElementById("drop_zone");
    }
    if (
        detectTouchEnd(
          drop_zone.offsetLeft,
          drop_zone.offsetTop,
          pageX,
          pageY,
          drop_zone.offsetWidth,
          drop_zone.offsetHeight
        )
      ) {
        const store = stores["bob"]
        console.log('store', stores)
        // createNode(
        //   store,
        //    100,
        //    100,
        //    "bob"
        // )
        let newNodes = { "8": {
      id: 8,
      position: { x: 100, y: 100 },
      data: { label: "Testeroni" },
      width: 100,
      height: 40,
      bgColor: "white",
      textColor: "black",
    }}
    let existingNodes = store.nodesStore
        store.nodesStore.update((nodes) => {
          console.log('nodes', nodes)
          return {...newNodes , ...nodes}
        });
        dropped = dropped.concat(e.target.id);
        e.target.style.position = "initial";
        dropped_in = true;
        status =
          "You dropped " + e.target.getAttribute("id") + " into drop zone";
      }
    // if (dropped_in == false) {
    //   status = "You let the " + e.target.getAttribute("id") + " go.";
    // }
    // dropped_in = false;
  }

  function handleTouchStart(e) {
    status = "Touch start with element " + e.target.getAttribute("id");
    originalX = e.target.offsetLeft - 10 + "px";
    originalY = e.target.offsetTop - 10 + "px";
    activeEvent = "start";
  }

  function handleTouchMove(e) {
    let touchLocation = e.targetTouches[0];
    let pageX = Math.floor(touchLocation.pageX - 50) + "px";
    let pageY = Math.floor(touchLocation.pageY - 50) + "px";
    status = "Touch x " + pageX + " Touch y " + pageY;
    e.target.style.position = "absolute";
    e.target.style.left = pageX;
    e.target.style.top = pageY;
    activeEvent = "move";
  }

  function handleTouchEnd(e) {
    console.log('touchend')
    e.preventDefault();
    if (activeEvent === "move") {
      let pageX = parseInt(e.target.style.left) - 50;
      let pageY = parseInt(e.target.style.top) - 50;

      if (
        detectTouchEnd(
          drop_zone.offsetLeft,
          drop_zone.offsetTop,
          pageX,
          pageY,
          drop_zone.offsetWidth,
          drop_zone.offsetHeight
        )
      ) {
        
        dropped = dropped.concat(e.target.id);
        e.target.style.position = "initial";
        dropped_in = true;
        status =
          "You dropped " + e.target.getAttribute("id") + " into drop zone";
      } else {
        e.target.style.left = originalX;
        e.target.style.top = originalY;
        status = "You let the " + e.target.getAttribute("id") + " go.";
      }
    }
  }

  function detectTouchEnd(x1, y1, x2, y2, w, h) {
    //Very simple detection here
    if (x2 - x1 > w) return false;
    if (y2 - y1 > h) return false;
    return true;
  }


  //asdfa
  import { stores } from '$lib/store/models/store';

  const pkStringGenerator = () => (Math.random() + 1).toString(36).substring(7);
import type { StoreType, PotentialAnchorType } from '$lib/store/types/types';
import { get } from 'svelte/store'; 
import { Node } from '$lib/nodes/models/Node';
import { Edge } from '$lib/edges/models/Edge';
import { Anchor } from '$lib/edges/models/Anchor';

import {
  rightCb,
  leftCb,
  topCb,
  bottomCb,
} from '$lib/edges/controllers/anchorCbUser';
import { createPotentialAnchor } from '$lib/store/controllers/util';
import { dynamicCbCreator } from '$lib/edges/controllers/anchorCbDev';
import { getAnchors } from '$lib/edges/controllers/util';
function getPotentialAnchors(
  store: StoreType,
  filter?: { [key: string]: any }
) {
  let potentialAnchorsArr = Object.values(get(store.potentialAnchorsStore));
  // filter the array for elements that match filter
  if (filter !== undefined) {
    potentialAnchorsArr = potentialAnchorsArr.filter((potentialAnchor) => {
      for (let filterKey in filter) {
        const filterValue = filter[filterKey];
        if (
          potentialAnchor[filterKey as keyof PotentialAnchorType] !==
          filterValue
        )
          return false;
      }
      return true;
    });
  }
  // return list of anchors
  return potentialAnchorsArr;
}

/**
 * Creates a new Node when user drags the Edge and releases mouse at a new spot. This functionality is needed for the "create new node by dragging" feature. See TemporaryEdge.createNode()
 * This function has no output, but alters the store. New Node/Edge/Anchor objects are added to the store.
 *
 * @param store The Svelvet store containing the state of a Svelvet component
 * @param sourceNodeId The id of the source Node
 * @param targetNodeX The postion X where user releases the mouse, which should be the x-axis position for the new Node
 * @param targetNodeY The postion Y where user releases the mouse, which should be the y-axis position for the new Node
 * @param canvasId The canvasId of a Svelvet component
 */
function createNode(
  store: StoreType,
  targetNodeX: number,
  targetNodeY: number,
  canvasId: string
) {
  // create a new node
  const targetNodeId = pkStringGenerator();

  const node = new Node(
    targetNodeId,
    targetNodeX,
    targetNodeY,
    100, // width
    100, // height
    'white', // background color
    {
      label: 'new node',
    },
    canvasId,
    'black', // borderColor
    false, //  Node has an image
    '', // src, not sure what this does
    'black', // text color
    0, // borderRadius
    [],
    '',
    () => {}
  );

  // create new potential anchor, we do this because if we create
  const potentialAnchorRight = createPotentialAnchor(
    rightCb,
    store,
    targetNodeId,
    canvasId
  );
  const potentialAnchorLeft = createPotentialAnchor(
    leftCb,
    store,
    targetNodeId,
    canvasId
  );
  const potentialAnchorTop = createPotentialAnchor(
    topCb,
    store,
    targetNodeId,
    canvasId
  );
  const potentialAnchorBottom = createPotentialAnchor(
    bottomCb,
    store,
    targetNodeId,
    canvasId
  );

  // create an edge
  const edgeId = pkStringGenerator();
  const newEdge = new Edge(
    edgeId,
    -1,
    -1,
    -1,
    -1,
    canvasId,
    '',
    'bezier',
    'black',
    'black',
    'black',
    false,
    true,
    false,
    () => {},
    ''
  );

 


  // put everything into the store
  const { nodesStore, edgesStore, anchorsStore, potentialAnchorsStore } = store;

  nodesStore.update((nodes) => {
    nodes[targetNodeId] = node;
    return { ...nodes };
  });

  potentialAnchorsStore.update((anchors) => {
    anchors[potentialAnchorRight.id] = potentialAnchorRight;
    anchors[potentialAnchorTop.id] = potentialAnchorTop;
    anchors[potentialAnchorBottom.id] = potentialAnchorBottom;
    anchors[potentialAnchorLeft.id] = potentialAnchorLeft;
    return { ...anchors };
  });
  edgesStore.update((edges) => {
    edges[edgeId] = newEdge;
    return { ...edges };
  });
  // make sure to update positions of anchors and potential anchors. TODO: don't need to do this for the entire store
  const anchors = getAnchors(store);
  for (const anchor of anchors) anchor.callback();
  const potAnchors = getPotentialAnchors(store);
  for (const anchor of potAnchors) anchor.callback();
}

  ///asdfasdf
</script>
<!-- <Svelvet
  nodes={initialNodes}
  edges={initialEdges}
  width={900}
  height={900}
  background
/> -->
<div id="drop_zone" on:dragenter={handleDragEnter} on:dragleave={handleDragLeave} on:drop={handleDragDrop}>
  <Svelvet nodes={initialNodes} edges={initialEdges} canvasId={"bob"} />
</div>
<h2 id="app_status">Drag status: {status}</h2>
<h1>Drop Zone</h1>

<div
  on:dragenter={handleDragEnter}
  on:dragleave={handleDragLeave}
  bind:this={drop_zone}
  ondragover="return false"
>
  {#each objects.filter((v) => dropped.includes(`${v.id}`)) as { id }, i}
    <div class="objects" {id} style="cursor: auto">
      Object {id}
    </div>
  {/each}
</div>

{#each objects.filter((v) => !dropped.includes(`${v.id}`)) as { id }, i}
  <div
    {id}
    class="objects"
    draggable="true"
    bind:this={objects[i].el}
    on:dragstart={handleDragStart}
    on:dragend={handleDragEnd}
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
  >
    Object {id}
  </div>
{/each}

<style>
  :global(html),
  :global(body) {
    margin: 0;
    height: 100%;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
  }

  #drop_zone_ex {
    background-color: #eee;
    border: #999 1px solid;
    width: 280px;
    height: 200px;
    padding: 8px;
    font-size: 19px;
  }

  .objects {
    display: inline-block;
    background-color: #fff3cc;
    border: #dfbc6a 1px solid;
    width: 50px;
    height: 50px;
    margin: 10px;
    padding: 8px;
    font-size: 18px;
    text-align: center;
    box-shadow: 2px 2px 2px #999;
    cursor: move;
  }
</style>

import { GetStaticProps, InferGetStaticPropsType } from "next";
import { PersonProps } from "@component/types/props";
import { Inter } from "next/font/google";
import { TreeView, TreeItem } from "@mui/lab";
import { FetchNodes } from "@component/lib/fetch-nodes";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //   { persons,
  // }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [showChildren, setShowChildren] = useState(false);

  const renderNodeTree = (nodes: PersonProps[]) =>
    nodes.map((node: PersonProps) => (
      <TreeItem
        key={node.id}
        nodeId={node.node_height.toString()}
        label={node.name}
      >
        {/* {!node.parent} && */}
        {Array.isArray(node.children)
          ? node.children.map((child) => renderNodeTree([child]))
          : null}
      </TreeItem>
    ));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-4xl font-bold">Organization Overview</p>
      </div>
      {/* TODO: Show nodes in a nicer way */}

      <div className="flex flex-col items-center justify-center space-y-2">
        <TreeView
          aria-label="node tree"
          // defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={["1"]}
          // defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
          onClick={() => setShowChildren(true)}
        >
          {renderNodeTree(personData)}
        </TreeView>
      </div>
      {/* {persons.map((person: PersonProps, idx: number) => (
        <TreeView
          aria-label="node tree"
          // defaultCollapseIcon={<ExpandMoreIcon />}
          // defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          <TreeItem
            key={person.id.toString()}
            nodeId={person.node_height.toString()}
            label={person.name}
          />
        </TreeView>
      ))}

      {persons.map((person: PersonProps, idx: number) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <p className="text-2xl font-bold">{person.name}</p>
          <p className="text font-bold">ID: {person.id}</p>
          <p className="text font-bold">Parent: {person.parent}</p>
          <p className="text font-bold">
            Children: {person.children?.map((child) => child + ", ")}
          </p>
          <p className="text font-bold">Node Height: {person.node_height}</p>
          <p className="text font-bold">
            Manager: {person.manager ? "yes" : ""}
          </p>
          <p className="text font-bold">Department: {person.department}</p>
          <p className="text font-bold">
            Developer: {person.developer ? "yes" : ""}
          </p>
          <p className="text font-bold">
            Programming Language: {person.programming_language}
          </p>
        </div> */}
      {/* ))} */}
    </main>
  );
}

// export function TreeObjectView() {
//   const renderNodeTree = (nodes: PersonProps[]) =>
//     nodes.map((node: PersonProps) => (
//       <TreeItem key={node.id} nodeId={node.id.toString()} label={node.name}>
//         {Array.isArray(node.children)
//           ? node.children.map((child) => renderNodeTree([child]))
//           : null}
//       </TreeItem>
//     ));

//   return (
//     <TreeView
//       aria-label="node tree"
//       // defaultCollapseIcon={<ExpandMoreIcon />}
//       defaultExpanded={["1"]}
//       // defaultExpandIcon={<ChevronRightIcon />}
//       sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
//     >
//       {renderNodeTree(personData)}
//     </TreeView>
//   );
// }

// From https://github.com/mui/material-ui/issues/19454
export function ConditionalWrapper({
  show,
  children,
}: {
  show: boolean;
  children: PersonProps[];
  nodeId: string;
}) {
  if (!show) return null;
  return children;
}

const personData = await FetchNodes();

export const getStaticProps: GetStaticProps = async () => {
  const persons: PersonProps[] = await FetchNodes();

  console.log(persons);

  return {
    props: {
      persons,
    },
  };
};

// export const getStaticProps: GetStaticProps = async () => {
//   const persons = await prisma.person.findMany({
//     include: {
//       children: true,
//       parent: true,
//       programming_language: true,
//     },
//   });
//   return { props: { persons } };
// };

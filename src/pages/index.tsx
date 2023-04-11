import { GetStaticProps } from "next";
import prisma from "@component/lib/prisma";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ persons }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-4xl font-bold">Organization Overview</p>
      </div>
      {/* TODO: Show nodes in a nicer way */}
      <table>
        <tbody>
          <tr>
            <th className={`$inter.className`}>Id</th>
            <th className={`$inter.className`}>Name</th>
            <th className={`$inter.className`}>Parent</th>
            <th className={`$inter.className`}>Children</th>
            <th className={`$inter.className`}>nodeHeight</th>
            <th className={`$inter.className`}>Manager?</th>
            <th className={`$inter.className`}>Department</th>
            <th className={`$inter.className`}>Developer?</th>
            <th className={`$inter.className`}>
              Favourite Programming Language
            </th>
          </tr>
          {persons.map((person, index) => (
            <tr key={index} suppressHydrationWarning={true}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.parent?.id}</td>
              <td>{person.children?.map((child) => child.id + ", ")}</td>
              <td>{person.nodeHeight}</td>
              <td>{person.manager ? "yes" : ""}</td>
              <td>{person.department}</td>
              <td>{person.developer ? "yes" : ""}</td>
              <td>{person.programmingLanguage?.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const persons = await prisma.person.findMany({
    include: {
      children: true,
      parent: true,
      programming_language: true,
    },
  });
  return { props: { persons } };
};

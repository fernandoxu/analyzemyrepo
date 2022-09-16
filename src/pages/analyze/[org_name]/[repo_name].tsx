import { useRouter } from "next/router";
import Sidebar from "../../../components/SideBar";
import Image from "next/image";
import { trpc } from "../../../utils/trpc";
import OverViewSection from "../../../components/Overview/Overview";
import HeaderSecondary from "../../../components/HeaderSecondary";
import { GoLinkExternal } from "react-icons/go";

const RepoPage = () => {
  const router = useRouter();
  const { org_name, repo_name } = router.query;

  const full_name = org_name + "/" + repo_name;

  const data = trpc.useQuery([
    "github.get_github_repo",
    { owner: org_name as string, repo: repo_name as string },
  ]);

  const commits = trpc.useQuery([
    "github.get_github_commits",
    {
      owner: org_name as string,
      repo: repo_name as string,
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <HeaderSecondary />
      <main className="container mx-auto p-4 flex max-w-screen-xl">
        <Sidebar
          sections={[
            "Overview",
            "Community Health",
            "Repo Completeness",
            "More Insights",
          ]}
        />
        <div className="container mx-auto flex flex-col">
          <div className="w-fit px-4 py-5 bg-white rounded-lg shadow mx-auto flex flex-row items-center gap-2">
            <div>
              <Image
                src={`https://github.com/${org_name}.png`}
                width="30"
                height="30"
                alt={full_name}
                priority={true}
              />
            </div>
            <div className="text-xl text-gray-900 truncate">{full_name}</div>
            <a
              href={`https://github.com/${full_name}`}
              className="hover:text-primary"
            >
              <GoLinkExternal className="mt-1" />
            </a>
          </div>
          {/* Overview section */}
          <OverViewSection
            section_id="Overview"
            response={data}
            commits_response={commits}
          />
        </div>
      </main>
    </div>
  );
};

export default RepoPage;

import { Layout } from "@arco-design/web-react";
import Content from "./Content";
import LeftMenu from "./LeftMenu";

function Root() {
  return (
    <div className="flex h-[100vh] justify-center">
      <div className="h-full mx-auto max-w-[1040px] w-[70%]">
        <Layout className="f-full overflow-y-auto">
          <Layout.Sider className="mr-6 shadow-none" width={234}>
            <LeftMenu />
          </Layout.Sider>
          <Layout.Content className="max-h-[100vh]">
            <Content />
          </Layout.Content>
        </Layout>
      </div>
    </div>
  );
}

export default Root;

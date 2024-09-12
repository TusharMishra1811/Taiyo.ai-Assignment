import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LineChart from "./LineChart";
import Map from "./Map";

const Dashboard = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <LineChart />
      <Map />
    </QueryClientProvider>
  );
};

export default Dashboard;

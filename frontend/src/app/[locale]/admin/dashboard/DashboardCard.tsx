import Link from "next/link";
import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type Props = {
  title: string;
  count: string;
  href: string;
  description: string;
};

const DashboardCard = ({
  title,
  count,
  href,
  description,
}: Props): ReactElement => {
  return (
    <Link href={href}>
      <Card className="hover:bg-gray-50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <span className="text-3xl font-bold text-gray-600">{count}</span>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DashboardCard;

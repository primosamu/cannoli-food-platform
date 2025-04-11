import React, { useState } from "react";
import { CampaignData, CampaignType } from "@/types/campaign";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Edit,
  Eye,
  MoreHorizontal,
  Pause,
  Play,
  Trash2,
  Users,
  Copy,
  BarChart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface CampaignListProps {
  campaigns: CampaignData[];
  type?: "active" | "scheduled" | "completed" | "draft";
}

const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  type = "active",
}) => {
  const [data, setData] = useState<CampaignData[]>(campaigns);

  const getCampaignTypeBadge = (type: CampaignType) => {
    switch (type) {
      case "whatsapp":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">WhatsApp</Badge>;
      case "sms":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">SMS</Badge>;
      case "email":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Email</Badge>;
      case "paid":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Paid</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="border-blue-300 text-blue-700">Scheduled</Badge>;
      case "draft":
        return <Badge variant="outline" className="border-gray-300 text-gray-600">Draft</Badge>;
      case "completed":
        return <Badge variant="outline" className="border-gray-300 text-gray-600">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const columns: ColumnDef<CampaignData>[] = [
    {
      accessorKey: "name",
      header: "Campaign",
      cell: ({ row }) => {
        const campaign = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{campaign.name}</span>
            <span className="text-xs text-muted-foreground">
              {getCampaignTypeBadge(campaign.type)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "audienceSize",
      header: "Audience",
      cell: ({ row }) => {
        const audienceSize = row.original.audienceSize || 0;
        return (
          <div className="flex items-center">
            <Users className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{audienceSize.toLocaleString()}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "scheduledDate",
      header: "Date",
      cell: ({ row }) => {
        const scheduledDate = row.original.scheduledDate;
        if (!scheduledDate) return "-";
        
        return (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{format(scheduledDate, "MMM dd, yyyy")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return getStatusBadge(row.original.status);
      },
    },
    {
      id: "stats",
      header: "Statistics",
      cell: ({ row }) => {
        return (
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <BarChart className="h-4 w-4" />
            <span>View Stats</span>
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const campaign = row.original;
        
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" /> View
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" /> Duplicate
                </DropdownMenuItem>
                {campaign.status === "active" ? (
                  <DropdownMenuItem>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    <Play className="mr-2 h-4 w-4" /> Start
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  if (data.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <p>No {type} campaigns found.</p>
        <p className="mt-2">Click "Create Campaign" to start a new marketing initiative.</p>
      </div>
    );
  }

  return <DataTable columns={columns} data={data} />;
};

export default CampaignList;

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://functions.poehali.dev/36e0ccde-a82b-4626-bfb7-e1d922dbd482",
      );
      const data = await response.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { label: string; variant: "default" | "secondary" | "destructive" }
    > = {
      new: { label: "Новая", variant: "default" },
      contacted: { label: "Связались", variant: "secondary" },
      in_progress: { label: "В работе", variant: "secondary" },
      completed: { label: "Завершена", variant: "secondary" },
      cancelled: { label: "Отменена", variant: "destructive" },
    };

    const config = statusConfig[status] || statusConfig.new;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-muted-foreground">Загрузка заявок...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              CRM - Заявки с сайта
            </h1>
            <p className="text-muted-foreground">
              Всего заявок: <span className="font-semibold">{leads.length}</span>
            </p>
          </div>
          <Button onClick={fetchLeads} variant="outline">
            <Icon name="RefreshCw" className="mr-2" size={16} />
            Обновить
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Список заявок</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">ID</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Имя</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <Icon
                            name="Inbox"
                            className="mx-auto mb-2 text-muted-foreground"
                            size={48}
                          />
                          <p className="text-muted-foreground">
                            Заявок пока нет
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">
                            #{lead.id}
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDate(lead.created_at)}
                          </TableCell>
                          <TableCell>{lead.name}</TableCell>
                          <TableCell>
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-accent hover:underline"
                            >
                              {lead.phone}
                            </a>
                          </TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-accent hover:underline text-sm"
                            >
                              {lead.email}
                            </a>
                          </TableCell>
                          <TableCell>{getStatusBadge(lead.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedLead(lead)}
                            >
                              <Icon name="Eye" size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {selectedLead && (
            <Card className="border-2 border-accent">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Детали заявки #{selectedLead.id}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLead(null)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Имя клиента
                    </p>
                    <p className="font-semibold">{selectedLead.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Дата обращения
                    </p>
                    <p className="font-semibold">
                      {formatDate(selectedLead.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Телефон
                    </p>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="font-semibold text-accent hover:underline"
                    >
                      {selectedLead.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="font-semibold text-accent hover:underline"
                    >
                      {selectedLead.email}
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Сообщение
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedLead.message}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" variant="outline">
                    <Icon name="Phone" className="mr-2" size={16} />
                    Позвонить
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <Icon name="Mail" className="mr-2" size={16} />
                    Написать
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
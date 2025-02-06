import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "./components/header";
import { curdUtils } from "./utils/crud";
import { cardType } from "./types";
import { Pencil } from "lucide-react";
import { Input } from "./components/ui/input";
import AddModal from "./modal/add-modal";
import AccessModal from "./modal/access-modal";
import toast from "react-hot-toast";
const App = () => {
  const { data } = useQuery({
    queryKey: ['get_data'],
    queryFn: curdUtils.getData
  })
  const queryClient = useQueryClient()
  const deleteData = useMutation({
    mutationFn: curdUtils.deleteData,
    onSuccess: () => {
      toast.success('Success delete item ✅')
      queryClient.invalidateQueries({queryKey: ['get_data']})
    },
    onError: (err) => {
      console.log(err);      
    }
  })

  return (
    <div className="text-center text-green-500">
      <Header />
      <main className="max-w-6xl mx-auto px-3 mt-10">       
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Input className="w-full md:w-[65%] xl:w-[60%]" type="search" placeholder="Search a item..."/>
          <AddModal/>
        </div>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead >Date</TableHead>
                <TableHead >Time</TableHead>
                <TableHead className="w-[150px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length ? data.map((el: cardType) => (
                <TableRow key={el.id} className="hover:bg-gray-400 text-white hover:text-black transition-colors delay-100 hover:cursor-pointer text-start">
                  <TableCell>
                    <img className="w-[200px] object-cover h-[100px] rounded-lg" src={el.photo} alt={el.title} />
                  </TableCell>
                  <TableCell className="text-[12px] md:text-[16px] xl:text-[18px]">{el.title}</TableCell>
                  <TableCell  className="text-[10px] md:text-[12px] xl:text-[14px] font-medium">{el.description}</TableCell>
                  <TableCell  className="text-[12px] md:text-[16px] xl:text-[16px]">{el.date}</TableCell>
                  <TableCell className="text-center text-[14px] font-bold">{el.time}</TableCell>
                  <TableCell className="flex items-center justify-center gap-x-4"><Pencil/> <AccessModal fn={deleteData.mutate} id={el.id} style=""/></TableCell>
              </TableRow>
              )) :
              <></>
              }
            </TableBody>
          </Table>
      </main>
    </div>
  );
};

export default App;
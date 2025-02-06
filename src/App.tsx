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
import { Input } from "./components/ui/input";
import AddModal from "./modal/add-modal";
import AccessModal from "./modal/access-modal";
import toast from "react-hot-toast";
import EditMOdal from "./modal/edit-modal";
import { useState } from "react";
const App = () => {
  const queryClient = useQueryClient()
  // Get data json-server
  const { data } = useQuery({
    queryKey: ['get_data'],
    queryFn: curdUtils.getData
  })
  // Delete data json-server
  const deleteData = useMutation({
    mutationFn: curdUtils.deleteData,
    onSuccess: () => {
      toast.success('Success delete item 🗑️')
      queryClient.invalidateQueries({queryKey: ['get_data']})
    },
    onError: (err) => {
      console.log(err);      
    }
  })
  const [search, setSearch] = useState("");
  // Qidiruv inputi bo‘yicha filter qilish
  const filteredData = data?.filter((event:cardType) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredData);
  

  return (
    <div className="text-center text-green-500">
      <Header />
      <main className="max-w-6xl mx-auto px-3 mt-10">       
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Input onChange={(e) => setSearch(e.target.value)} className="w-full text-white md:w-[65%] xl:w-[80%] !p-5" type="search" placeholder="Search a item..."/>
          <AddModal/>
        </div>
        <Table className="min-w-[540px] md:min-w-[720px] overflow-x-scroll mt-8">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader className="text-white">
              <TableRow>
                <TableHead className="text-white">Image</TableHead>
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white w-[180px] md:w-auto">Description</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Time</TableHead>
                <TableHead className="w-[50px] md:w-[150px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {!search?.length ? data?.map((el: cardType) => (
                <TableRow key={el.id} className="hover:bg-gray-700 text-white transition-colors delay-100 hover:cursor-pointer text-start">
                  <TableCell className="w-[150px]">
                    <img className="w-[200px] object-cover h-[100px] rounded-lg" src={el.photo} alt={el.title} />
                  </TableCell>
                  <TableCell className="text-[12px] md:text-[16px] xl:text-[18px]">{el.title}</TableCell>
                  <TableCell  className="text-[10px] md:text-[12px] xl:text-[14px] font-medium">{el.description}</TableCell>
                  <TableCell  className="text-[12px] md:text-[16px] xl:text-[16px] md:w-[100px]">{el.date}</TableCell>
                  <TableCell className="text-center text-[14px] font-bold text-yellow-500">{el.time}</TableCell>
                  <TableCell className="">
                    <div className="flex items-center justify-center gap-x-5 h-[45px]">
                      <EditMOdal description={el.description} id={el.id} photo={el.photo} time={el.time} title={el.title} date={el.date}/> <AccessModal fn={deleteData.mutate} id={el.id} style=""/>
                    </div>
                  </TableCell>
              </TableRow>
              )) :
              filteredData?.length ? filteredData?.map((el: cardType) => (
                <TableRow key={el.id} className="hover:bg-gray-700 text-white transition-colors delay-100 hover:cursor-pointer text-start">
                  <TableCell className="w-[150px]">
                    <img className="w-[200px] object-cover h-[100px] rounded-lg" src={el.photo} alt={el.title} />
                  </TableCell>
                  <TableCell className="text-[12px] md:text-[16px] xl:text-[18px]">{el.title}</TableCell>
                  <TableCell  className="text-[10px] md:text-[12px] xl:text-[14px] font-medium">{el.description}</TableCell>
                  <TableCell  className="text-[12px] md:text-[16px] xl:text-[16px] md:w-[100px]">{el.date}</TableCell>
                  <TableCell className="text-center text-[14px] font-bold text-yellow-500">{el.time}</TableCell>
                  <TableCell className="">
                    <div className="flex items-center justify-center gap-x-5 h-[45px]">
                      <EditMOdal description={el.description} id={el.id} photo={el.photo} time={el.time} title={el.title} date={el.date}/> <AccessModal fn={deleteData.mutate} id={el.id} style=""/>
                    </div>
                  </TableCell>
              </TableRow>
              )) : <h2 className="text-[22px] md:text-[30px] xl:text-[30px] text-red-500 font-medium text-center mt-4 max-w-6xl">Sorry, such information does not exist! 😔</h2>
              }
            </TableBody>
          </Table>
      </main>
    </div>
  );
};

export default App;
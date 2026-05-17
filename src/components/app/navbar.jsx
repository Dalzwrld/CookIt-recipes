import { Tabs } from 'radix-ui'
import React from 'react'
import { TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Button } from '../ui/button'

export default function Navbar() {
  return (
    <div className="">
        <div className="">
            <span className="">Cook</span>
            <span className="">It</span>
        </div>

        <Tabs defaultValue="home" className="">
            <TabsList>
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="recipes">Recipes</TabsTrigger>
            </TabsList>
            <TabsContent value="home"></TabsContent>
            <TabsContent value="recipes"></TabsContent>
        </Tabs>

        <Button className="">
            Add Recipe
        </Button>
    </div>
  )
}

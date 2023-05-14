import { LayoutDashboard, Shirt, PieChart, Users, Tag, CreditCard, Truck, ShoppingCart } from 'lucide-react'

export const navigationAnalyticsLinks = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard
    },
    {
        name: 'Reportes',
        path: '/dashboard/reports',
        icon: PieChart
    },
    {
        name: 'Transacciones',
        path: '/dashboard/transactions',
        icon: CreditCard
    },
    {
        name: 'Envíos',
        path: '/dashboard/shipments',
        icon: Truck
    },
]

export const navigationContentLinks = [
    {
        name: 'Productos',
        path: '/dashboard/products',
        icon: Shirt
    },
    {
        name: 'Usuarios',
        path: '/dashboard/users',
        icon: Users
    },
    {
        name: 'Ordenes',
        path: '/dashboard/orders',
        icon: ShoppingCart
    },
    {
        name: 'Categorías',
        path: '/dashboard/categories',
        icon: Tag
    },
]


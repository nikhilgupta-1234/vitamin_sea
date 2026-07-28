"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
    Store,
    Phone,
    Mail,
    MapPin,
    Save,
} from "lucide-react";

import {
    FaInstagram,
    FaFacebook,
    FaWhatsapp,
} from "react-icons/fa";



export default function SettingsPage() {
    const [loading, setLoading] = useState(false);

    const [settings, setSettings] = useState({
        store_name: "",
        store_email: "",
        store_phone: "",
        store_address: "",
        instagram: "",
        facebook: "",
        whatsapp: "",
        currency: "INR",
        shipping_fee: 0,
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    async function fetchSettings() {
        const { data } = await supabase
            .from("settings")
            .select("*")
            .limit(1)
            .maybeSingle();

        if (data) {
            setSettings({
                store_name: data.store_name || "",
                store_email: data.store_email || "",
                store_phone: data.store_phone || "",
                store_address: data.store_address || "",
                instagram: data.instagram || "",
                facebook: data.facebook || "",
                whatsapp: data.whatsapp || "",
                currency: data.currency || "INR",
                shipping_fee: data.shipping_fee || 0,
            });
        }
    }

    async function saveSettings() {
        try {
            setLoading(true);

            const { data: existing } = await supabase
                .from("settings")
                .select("id")
                .limit(1)
                .maybeSingle();

            if (existing) {
                await supabase
                    .from("settings")
                    .update({
                        ...settings,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", existing.id);
            } else {
                await supabase.from("settings").insert({
                    ...settings,
                });
            }

            alert("Settings updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to save settings.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex-1 bg-[#F8FAFC] p-8">
            <div className="mb-10">
                <h1 className="font-serif text-5xl text-[#143D60]">
                    Settings
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage your store settings
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">

                {/* Store Information */}

                <div className="rounded-[32px] bg-white p-8 shadow-sm">
                    <h2 className="mb-8 text-3xl font-bold text-[#143D60]">
                        Store Information
                    </h2>

                    <div className="space-y-5">

                        <div className="relative">
                            <Store className="absolute left-5 top-5 text-gray-400" size={20} />
                            <input
                                value={settings.store_name}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        store_name: e.target.value,
                                    })
                                }
                                placeholder="Store Name"
                                className="w-full rounded-2xl border py-4 pl-14 pr-4 outline-none focus:border-sky-500"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-5 top-5 text-gray-400" size={20} />
                            <input
                                value={settings.store_email}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        store_email: e.target.value,
                                    })
                                }
                                placeholder="Store Email"
                                className="w-full rounded-2xl border py-4 pl-14 pr-4 outline-none focus:border-sky-500"
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-5 top-5 text-gray-400" size={20} />
                            <input
                                value={settings.store_phone}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        store_phone: e.target.value,
                                    })
                                }
                                placeholder="Phone Number"
                                className="w-full rounded-2xl border py-4 pl-14 pr-4 outline-none focus:border-sky-500"
                            />
                        </div>

                        <div className="relative">
                            <MapPin className="absolute left-5 top-5 text-gray-400" size={20} />
                            <textarea
                                value={settings.store_address}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        store_address: e.target.value,
                                    })
                                }
                                placeholder="Store Address"
                                className="h-32 w-full rounded-2xl border py-4 pl-14 pr-4 outline-none focus:border-sky-500"
                            />
                        </div>

                    </div>
                </div>

                {/* Social Media */}

                <div className="rounded-[32px] bg-white p-8 shadow-sm">
                    <h2 className="mb-8 text-3xl font-bold text-[#143D60]">
                        Social Media
                    </h2>

                    <div className="space-y-5">

                        <div className="relative">
                            <FaInstagram
                                className="absolute left-5 top-5 h-5 w-5 text-pink-500"
                            />
                            <input
                                value={settings.instagram}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        instagram: e.target.value,
                                    })
                                }
                                placeholder="Instagram URL"
                                className="w-full rounded-2xl border py-4 pl-14 pr-4 outline-none focus:border-sky-500"
                            />
                        </div>

                        <div className="relative">
                            <FaFacebook
                                className="absolute left-5 top-5 text-blue-600"
                                size={20}
                            />

                            <input
                                value={settings.facebook}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        facebook: e.target.value,
                                    })
                                }
                                placeholder="Facebook URL"
                                className="w-full rounded-2xl border py-4 pl-14 pr-4 outline-none focus:border-sky-500"
                            />
                        </div>

                        <div className="relative">
                            <FaWhatsapp
                                className="absolute left-5 top-5 text-green-500"
                                size={20}
                            />

                            <input
                                value={settings.whatsapp}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        whatsapp: e.target.value,
                                    })
                                }
                                placeholder="WhatsApp Number"
                                className="w-full rounded-2xl border py-4 pl-14 pr-4 outline-none focus:border-sky-500"
                            />
                        </div>

                    </div>
                </div>

                {/* Store Configuration */}

                <div className="rounded-[32px] bg-white p-8 shadow-sm lg:col-span-2">
                    <h2 className="mb-8 text-3xl font-bold text-[#143D60]">
                        Store Configuration
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">

                        <select
                            value={settings.currency}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    currency: e.target.value,
                                })
                            }
                            className="rounded-2xl border p-4 outline-none focus:border-sky-500"
                        >
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                        </select>

                        <input
                            type="number"
                            value={settings.shipping_fee}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    shipping_fee: Number(e.target.value),
                                })
                            }
                            placeholder="Shipping Fee"
                            className="rounded-2xl border p-4 outline-none focus:border-sky-500"
                        />

                    </div>
                </div>
            </div>

            <button
                onClick={saveSettings}
                disabled={loading}
                className="mt-10 flex items-center gap-3 rounded-2xl bg-sky-500 px-8 py-4 font-medium text-white transition hover:bg-sky-600 disabled:opacity-60"
            >
                <Save size={20} />

                {loading ? "Saving..." : "Save Settings"}
            </button>
        </main>
    );
}
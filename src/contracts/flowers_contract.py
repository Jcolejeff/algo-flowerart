from pyteal import *


class Floral:
    class Variables:
        name = Bytes("name")
        description = Bytes("description")
        image = Bytes("image")
        price = Bytes("price")
        quantity = Bytes("QUANTITY")
        owner = Bytes("owner")

    class AppMethods:
        buy = Bytes("buy")
        edit = Bytes("edit")

    def application_creation(self):
        return Seq([
            Assert(Txn.application_args.length() == Int(5)),
            Assert(Txn.note() == Bytes("floralart:uv110")),
            Assert(Btoi(Txn.application_args[3]) > Int(0)),
            App.globalPut(self.Variables.name, Txn.application_args[0]),
            App.globalPut(self.Variables.description, Txn.application_args[1]),
            App.globalPut(self.Variables.image, Txn.application_args[2]),
            App.globalPut(self.Variables.price,
                          Btoi(Txn.application_args[3])),
            App.globalPut(self.Variables.quantity,
                          Btoi(Txn.application_args[4])),
            App.globalPut(self.Variables.owner, Txn.sender()),
            Approve()
        ])

    def buy(self):
        return Seq([
            Assert(
                And(
                    Global.group_size() == Int(2),
                    Txn.application_args.length() == Int(1),
                ),
            ),
            Assert(
                And(
                    Gtxn[1].type_enum() == TxnType.Payment,
                    Gtxn[1].receiver() == App.globalGet(
                        self.Variables.owner),
                    Gtxn[1].amount() == App.globalGet(
                        self.Variables.price),
                    Gtxn[1].sender() == Gtxn[0].sender(),
                )
            ),

            App.globalPut(self.Variables.quantity, App.globalGet(
                self.Variables.quantity) - Int(1)),
            Approve()
        ])

    def edit(self):
        quantity = Txn.application_args[1]
        return Seq([
            Assert(
                And(
                    Global.group_size() == Int(1),
                    Txn.application_args.length() == Int(2),
                ),
            ),
            App.globalPut(self.Variables.quantity, Btoi(quantity)),
            Approve()
        ])
    def application_deletion(self):
        return Return(Txn.sender() == Global.creator_address())

    def application_start(self):
        return Cond(
            [Txn.application_id() == Int(0), self.application_creation()],
            [Txn.on_completion() == OnComplete.DeleteApplication,
             self.application_deletion()],
            [Txn.application_args[0] == self.AppMethods.buy, self.buy()],
            [Txn.application_args[0] == self.AppMethods.edit, self.edit()],
        )

    def approval_program(self):
        return self.application_start()

    def clear_program(self):
        return Return(Int(1))


